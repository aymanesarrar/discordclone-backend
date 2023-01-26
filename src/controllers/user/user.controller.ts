import { Request, Response } from "express";
import prisma from "../../lib/prisma";

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
export { getUserById };
