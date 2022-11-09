import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';

type TUser = {
  id: string;
  username: string;
};

export const comparePasswords = (password: string, hash: string) =>
  bcrypt.compare(password, hash);

export const hashPassword = (password: string) => bcrypt.hash(password, 5);

export const createJWT = (user: TUser) => {
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET
  );

  return token;
};

export const protect = (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401).json({ message: 'not authorized' });
    return;
  }

  const [, token] = bearer.split(' ');

  if (!token) {
    res.status(401).json({ message: 'not valid token' });
    return;
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;

    next();
  } catch (error) {
    console.log(error);

    res.status(401).json({ message: 'not valid token' });
    return;
  }
};
