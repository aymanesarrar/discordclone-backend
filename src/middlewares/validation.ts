import { NextFunction, Request, Response } from "express";

const handleValidation = (req: Request, res: Response, next: NextFunction) => {
  const { email, password, username } = req.body;
  
};
