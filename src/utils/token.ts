import * as jwt from 'jsonwebtoken';
import { jwtConstants } from 'src/core/guards/auth_guards/auth_guards.constants';

const verifyToken = async (token: string): Promise<any> => {
  const decoded = jwt.verify(token, jwtConstants.secret);
  return decoded;
}

export {
  verifyToken
}