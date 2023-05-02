import { NextFunction, Request, Response } from "express";
import * as yup from "yup";


export const validateLead = (schema: yup.Schema) => async (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;
    try {
      await schema.validate({body});
      return next();
    } catch (err: any) {
      return res.status(400).json({ type: err.name, message: err.message });
    }
  };