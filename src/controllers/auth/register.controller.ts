import { authSchema } from "../../utils/zodSchema";
import { Request, Response } from "express";
import prisma from "../../lib/prisma";
import bcrypt from "bcrypt";

const RegisterHandler = async (req: Request, res: Response) => {
  const { email, username, password } = req.body;
  try {
    const obj = authSchema.parse({
      username,
      email,
      password,
    });

    const user = await prisma.user.create({
      data: {
        email: obj.email,
        password: bcrypt.hashSync(obj.password, 3),
        username: obj.username,
      },
    });
    return res.status(200).json(user);
  } catch (error: any) {
    return res.status(400).send(JSON.parse(error.message)[0]);
  }
};
export { RegisterHandler };
