import { Controller, HttpException, HttpStatus, Next, Post, Req, Res } from '@nestjs/common';
import type { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { LineService } from './line.service';


@Controller('line')
export class LineController {
  constructor(private readonly lineService: LineService) { }

  @Post('/liff/callback')
  async liffCallback(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction): Promise<any> {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (!decoded) {
        next(
          new HttpException(
            {
              status: HttpStatus.UNAUTHORIZED,
              error: 'Unauthorized',
              message: 'Invalid token',
            },
            HttpStatus.UNAUTHORIZED,
          ),
        );
        return;
      }

      const userId = req.body.userId;
      const user = await this.lineService.findByUserId(userId);
      if (user) {
        await this.lineService.updateUser(req.body);
      } else {
        await this.lineService.createUser(req.body);
      }

      return res.json({ statusText: 'Login Successful' });
    } catch (error) {
      next(
        new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'BAD_REQUEST',
            message: error.message,
          },
          HttpStatus.BAD_REQUEST,
        ),
      );
    }
  }
}