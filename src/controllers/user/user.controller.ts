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
    }
  } catch (error: any) {
    return res.status(404).send({ type: "error", message: error.message });
  }
};
export { getUserById };
