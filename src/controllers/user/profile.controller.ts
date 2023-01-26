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
  try {
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
          message: "profile created successfully",
          data: {
            email: updatedUser.email,
            completed: updatedUser.completed,
            created_at: updatedUser.created_at,
            updated_at: updatedUser.updated_at,
            username: updatedUser.username,
            role: updatedUser.role,
          },
        });
      }
    } else {
      return res
        .status(500)
        .send({ type: "error", message: "could not update the user" });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ type: "error", message: "this user already has a profile" });
  }
};
const updateProfile = async (req: Request, res: Response) => {
  try {
    const profile = await prisma.profile.findUnique({
      where: {
        userId: req.params.id,
      },
    });
    if (!profile) throw new Error("could not find a profile with this Id");
    const updatedData = await prisma.profile.update({
      where: {
        userId: req.params.id,
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
const getProfileByUserId = async (req: Request, res: Response) => {
  const data = await prisma.profile.findUnique({
    where: {
      userId: req.params.id,
    },
  });
  if (!data) {
    return res
      .status(404)
      .send({ type: "error", message: "a profile with this id was not found" });
  } else {
    return res.status(200).send({ type: "success", message: "", data });
  }
};
export { createProfile, updateProfile, getProfileByUserId };
