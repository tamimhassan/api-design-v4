import { Request, Response } from 'express';
import prisma from '../db';
import { comparePasswords, createJWT, hashPassword } from '../modules/auth';

export const createNewUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const IsExist = await prisma.user.findUnique({
    where: { username: req.body.username },
  });

  if (IsExist) {
    res.status(400).json({ message: 'This User already exist. Try another.' });
    return;
  }

  const user = await prisma.user.create({
    data: {
      username: username,
      password: await hashPassword(password),
    },
  });

  const token = createJWT(user);
  res.json({ token });
};

export const signin = async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({
    where: { username: req.body.username },
  });

  if (!user) {
    res.status(400).json({ message: "This User doesn't exist." });
    return;
  }

  const isValid = await comparePasswords(req.body.password, user.password);

  if (!isValid) {
    res.status(401).json({ message: 'nope' });
    return;
  }

  const token = createJWT(user);
  res.json({ token });
};
