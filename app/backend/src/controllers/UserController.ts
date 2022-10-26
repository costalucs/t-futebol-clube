import { Request, Response } from 'express';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import UserService from '../services/UserServices';

const userService = new UserService();
const jwtSecretKey = process.env.JWT_SECRET;

export default class UserController {
  login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    const user = await userService.findByEmail(email);

    if (!user) return res.status(401).json({ message: 'Incorrect email or password' });

    const comparePassword = await compare(password, user.password);

    if (!comparePassword) return res.status(401).json({ message: 'Incorrect email or password' });

    const payload = {
      role: user.role,
      email: user.email,
    };

    const token = sign(payload, jwtSecretKey as string);

    return res.status(200).json({ token });
  };

  getAll = async (req: Request, res: Response) => res.status(200).json({ mensagem: 'oi' });
}
