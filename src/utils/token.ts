import * as jwt from 'jsonwebtoken';

const verifyToken = async (token: string): Promise<any> => {
  const decoded = jwt.verify(token, 'secret');
  return decoded;
}

export {
  verifyToken
}