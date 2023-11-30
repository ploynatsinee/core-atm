import * as jwt from 'jsonwebtoken';
import { jwtConstants } from 'src/core/guards/auth_guards/auth_guards.constants';

const validateRequest = (request) => {
  const { headers } = request;
  if (!headers.authorization) {
    return false;
  }
  const token = headers.authorization.split(' ')[1];
  if (!token) {
    return false;
  }
  try {
    const decoded = jwt.verify(token, jwtConstants.secret);
    return decoded;
  }
  catch (error) {
    return false;
  }
}

export {
  validateRequest
}