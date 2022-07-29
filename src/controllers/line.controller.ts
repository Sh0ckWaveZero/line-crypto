import { NextFunction, Request, Response } from "express";
import { LineService } from "../services/line.service";
import HttpException from '../exceptions/HttpException';
import * as jwt from "jsonwebtoken";

export default class LineController {
  private lineService = new LineService();

  public liffCallback = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // Compare your signature and header's signature
      if (!decoded) {
        next(new HttpException(401, 'ไม่ได้รับอนุญาต'));
      }
      const user = await this.lineService.findByUserId(req.body.userId)
      if (user) {
        await this.lineService.updateUser(req.body)
      } else {
        await this.lineService.createUser(req.body)
      }
      return res.json({ statusText: "ล็อคอินสำเร็จ" });
    } catch (error) {
      next(new HttpException(400, error.message));
    }
  }
}
