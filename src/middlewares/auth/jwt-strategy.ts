import passportJwt from 'passport-jwt';
import { user as userService } from '../../services';
import { HttpCode } from '../../common/enums';

const { ExtractJwt, Strategy: JwtStrategy } = passportJwt;

const options: passportJwt.StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

const getJwtStrategy = () =>
  new JwtStrategy(options, async (jwtPayload, done) => {
    try {
      const user = await userService.getById(jwtPayload.userId);

      if (user) {
        return done(null, user);
      }
      return done(
        {
          status: HttpCode.UNAUTHORIZED,
          message: 'Bad token',
        },
        false,
      );
    } catch (error) {
      return done(error);
    }
  });

export { getJwtStrategy };
