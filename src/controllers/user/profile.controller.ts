import { Request, Response } from "express";
import prisma from "../../lib/prisma";

const createProfile = async (req: Request, res: Response) => {
  const { firstName, lastName, bio, picture } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      id: req.params.id,
    },
  });
  if (!user) {
    return res.status(404).send({ type: "error", message: "user not found" });
  }
  const data = await prisma.profile.create({
    data: {
      firstName,
      lastName,
      bio,
      picture,
      userId: req.params.id,
    },
  });
  if (data) {
    const updatedUser = await prisma.user.update({
      where: {
        id: req.params.id,
      },
      data: {
        completed: true,
      },
    });
    if (updatedUser) {
      return res.status(200).send({
        type: "success",
        message: "user updated successfully",
        data: updatedUser,
      });
    }
  } else {
    return res
      .status(500)
      .send({ type: "error", message: "could not update the user" });
  }
};
export { createProfile };
