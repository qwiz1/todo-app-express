import { Response, Request } from 'express';
import AuthService from '../services/auth.service';
import { AuthApiPath, HttpCode } from '../common/enums';
import { User } from '../common/types';

type Constructor = {
  authService: AuthService;
};

class AuthController {
  private authService: AuthService;

  constructor({ authService }: Constructor) {
    this.authService = authService;
  }

  async signUp(req: Request, res: Response) {
    await this.authService.signUp(req.body);
    res.json({ message: 'please confirm your email' }).status(HttpCode.CREATED);
  }

  async signIn(req: Request, res: Response) {
    const signResponse = await this.authService.signIn(req.body);
    res.json(signResponse).status(HttpCode.OK);
  }

  async confirm(req: Request, res: Response) {
    await this.authService.confirm(req.params.token);
    res.redirect(`${process.env.FRONTEND_HOST}${AuthApiPath.SIGN_IN}`);
  }

  async handleForgotPassword(req: Request, res: Response) {
    const message = await this.authService.handleForgotPassword(req.body.email);
    res.json(message).status(HttpCode.OK);
  }

  async updatePassword(req: Request, res: Response) {
    const user = req.user as User;
    const message = await this.authService.updatePassword({
      userId: user.id,
      ...req.body,
    });
    res.json(message).status(HttpCode.OK);
  }
}

export { AuthController };
