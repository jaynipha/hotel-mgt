import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

export const hashPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

export const  createToken = (payload, expiresIn = '1d') => {
  return jwt.sign(payload, process.env.SESSION_SECRET, { expiresIn });
}

export const comparePassword = (password, hash)  => {
  return bcrypt.compareSync(password, hash);
}

export const checkToken = (req) => {
  const {
    headers: { authorization },
  } = req;
  

  let bearerToken = null;
  if (authorization === undefined) throw new Error('no auth');


  if (authorization) {
    bearerToken = authorization.split(' ')[1]
      ? authorization.split(' ')[1]
      : authorization;
  }

  return (
    bearerToken
    || req.headers['x-access-token']
    || req.headers.token
    || req.body.token
  );
}


export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.SESSION_SECRET);
    return decoded;
  } catch (err) {
    throw new Error('Invalid Token');
  }
}