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
const updateProfile = async (req: Request, res: Response) => {
  try {
    const updatedData = await prisma.profile.update({
      where: {
        id: Number(req.params.id),
      },
      data: req.body,
    });
    return res.status(200).send({
      type: "success",
      message: "profile updated successfully",
      data: updatedData,
    });
  } catch (error: any) {
    if (error.message.includes("not found")) {
      return res
        .status(404)
        .send({ type: "error", message: "profile not found" });
    } else
      return res.status(500).send({ type: "error", message: error.message });
  }
};
export { createProfile, updateProfile };
