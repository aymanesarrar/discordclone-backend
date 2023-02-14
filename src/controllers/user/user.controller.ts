import { Request, Response } from "express";
import prisma from "../../lib/prisma";
import bcrypt from "bcrypt";

const getUserById = async (req: Request, res: Response) => {
  try {
    const data = await prisma.user.findUnique({
      where: {
        id: req.params.id,
      },
    });
    if (!data) {
      throw "could not find a user with this id";
    } else {
      return res.status(200).send({
        type: "success",
        data: {
          username: data.username,
          completed: data.completed,
          created_at: data.created_at,
          updated_at: data.updated_at,
          id: data.id,
          email: data.email,
        },
      });
    }
  } catch (error: any) {
    return res.status(404).send({ type: "error", message: error.message });
  }
};
const changePassword = async (req: Request, res: Response) => {
  const { oldPassword, newPassword } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: res.locals.username,
      },
    });
    if (!user)
      return res
        .status(404)
        .json({ status: "error", message: "user not found" });
    const compared = bcrypt.compareSync(oldPassword, user.password);
    if (compared) {
      const data = await prisma.user.update({
        where: {
          username: res.locals.username,
        },
        data: {
          password: bcrypt.hashSync(newPassword, 3),
        },
      });
      if (data) {
        return res.status(200).json({
          status: "success",
          message: "password updated successfully",
        });
      } else {
        return res
          .status(403)
          .json({ status: "error", message: "could not update the password" });
      }
    } else {
      return res
        .status(401)
        .json({
          status: "error",
          message: "the password does not match this user's password",
        });
    }
  } catch (error: any) {
    return res.status(503).json({ status: "error", message: error.message });
  }
};
export { getUserById, changePassword };
