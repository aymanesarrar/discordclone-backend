import { Request, Response } from "express";

const LoginHandler = (req: Request, res: Response) => {
  return res.status(200).send("testing api");
};
export { LoginHandler };
