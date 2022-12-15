import { Request, Response } from "express";
import prisma from "../../lib/prisma";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const LoginHandler = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });
    if (user) {
      const compared = bcrypt.compareSync(password, user.password);
      if (compared) {
        const token = jwt.sign(
          {
            username: user.username,
            email: user.email,
            id: user.id,
            role: user.role,
            created_at: user.created_at,
          },
          process.env.JWTSECRET as string
        );
        return res
          .status(200)
          .json({ message: "successfuly authenticated", token: token });
      } else {
        return res.status(401).json({ message: "incorrect password" });
      }
    } else {
      return res.status(404).json({
        message:
          "user not found, you can make an account by going to our sign up page",
      });
    }
  } catch (error: any) {
    console.log(error.message);
  }
  return res.status(200).send("good");
};
export { LoginHandler };
