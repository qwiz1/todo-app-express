import jwt from 'jsonwebtoken';
import { TokenPayload } from '../common/types';

const signJwt = (data: TokenPayload): string =>
  jwt.sign(data, String(process.env.JWT_SECRET), {
    expiresIn: data.expiresIn || process.env.JWT_EXPIRATION,
  });

export { signJwt };
