import { Repository } from 'typeorm';
import bcrypt, { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../entities/user.entity';
import { HttpError } from '../exceptions';
import { ApiPath, AuthApiPath, HttpCode } from '../common/enums';
import {
  UserSignInDTOPayload,
  UserSignUpDTOPayload,
  UserUpdatePasswordPayload,
  TokenPayload,
} from '../common/types';
import { signJwt, sendMail, setMailDetails } from '../helpers';

type Constructor = {
  userRepository: Repository<User>;
};

type SignResponse = {
  token: string;
  user: User;
};

class AuthService {
  userRepository: Repository<User>;

  constructor({ userRepository }: Constructor) {
    this.userRepository = userRepository;
  }

  public async signUp(
    signUpUserDto: UserSignUpDTOPayload,
  ): Promise<SignResponse> {
    const { email, password } = signUpUserDto;
    const isUserWithEmailExist = await this.userRepository.findOneBy({ email });

    if (isUserWithEmailExist) {
      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: 'Email or password already exist',
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUserEntity = this.userRepository.create({
      ...signUpUserDto,
      password: passwordHash,
    });
    const newUser = await this.userRepository.save(newUserEntity);

    const emailToken = signJwt({ userId: newUser.id, expiresIn: '4m' });
    const confirmationUrl = `${process.env.BASE_APP_URL}${ApiPath.AUTH}${AuthApiPath.CONFIRMATION}/${emailToken}`;

    console.log('CONFIRMATION URL', confirmationUrl);

    const mailDetails = setMailDetails({
      to: email,
      link: confirmationUrl,
      subject: 'Email Confirmation',
      content: 'Please click on link to confirm your email',
    });

    await sendMail(mailDetails);

    return {
      user: newUser,
      token: signJwt({ userId: newUser.id }),
    };
  }

  public async signIn(
    signInUserDto: UserSignInDTOPayload,
  ): Promise<SignResponse> {
    const { email, password } = signInUserDto;
    const user = await this.userRepository.findOneBy({ email });

    if (!user) {
      throw new HttpError({
        status: HttpCode.NOT_FOUND,
        message: 'User not found',
      });
    }

    if (!user.isConfirmed) {
      throw new HttpError({
        status: HttpCode.UNAUTHORIZED,
        message: 'Please confirm your email to sign-in',
      });
    }

    const arePasswordsEqual = await compare(password, user.password);

    if (!arePasswordsEqual) {
      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: 'Wrong password',
      });
    }

    return {
      user,
      token: signJwt({ userId: user.id }),
    };
  }

  public async confirm(token: string) {
    jwt.verify(token, String(process.env.JWT_SECRET), async (err, decoded) => {
      if (err) {
        throw new HttpError({
          status: HttpCode.BAD_REQUEST,
          message: err.message,
        });
      }
      const payload = decoded as TokenPayload;
      const confirmedUser = await this.userRepository.save({
        id: payload.userId,
        isConfirmed: true,
      });
      return confirmedUser;
    });
  }

  public async handleForgotPassword(email: string) {
    const user = await this.userRepository.findOneBy({ email });

    if (!user) {
      throw new HttpError({
        status: HttpCode.NOT_FOUND,
        message: 'User with that email not found',
      });
    }
    const newPassword = (Math.random() + 1).toString(36).substring(4);
    const passwordHash = await bcrypt.hash(newPassword, 10);

    await this.sendNewPasswordEmail(newPassword, email);

    await this.userRepository.save({ id: user.id, password: passwordHash });

    return {
      message: 'We send your new password on email.',
    };
  }

  public async updatePassword({
    userId,
    oldPassword,
    newPassword,
  }: UserUpdatePasswordPayload) {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new HttpError({
        status: HttpCode.NOT_FOUND,
        message: 'User not found',
      });
    }
    const arePasswordsEqual = await compare(oldPassword, user.password);
    if (!arePasswordsEqual) {
      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: 'Invalid old password',
      });
    }
    const passwordHash = await bcrypt.hash(newPassword, 10);
    await this.userRepository.save({ id: user.id, password: passwordHash });
    return {
      message: 'Successfully updated',
    };
  }

  private async sendNewPasswordEmail(newPassword: string, email: string) {
    const mailDetails = setMailDetails({
      to: email,
      subject: 'New Password',
      content: `Your new password to log in: ${newPassword}`,
    });

    await sendMail(mailDetails);
  }
}

export default AuthService;
