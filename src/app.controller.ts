import { Controller, Next, Post, Req, Res } from '@nestjs/common';
import type { Request, Response } from 'express';
import { AppService } from './app.service';
import * as crypto from 'crypto';
import { ConfigService, LineService, UtilService } from './common';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly config: ConfigService,
    private readonly util: UtilService,
    private readonly line: LineService,
  ) {}

  @Post('webhook')
  webhook(@Req() req: Request, @Res() res: Response, @Next() next: any): any {
    try {
      const data: any = JSON.stringify(req.body);
      const signature = crypto
        .createHmac('SHA256', this.config.get('line.channelSecret'))
        .update(data)
        .digest('base64')
        .toString();

      // Compare your signature and header's signature
      if (signature !== req.headers['x-line-signature']) {
        return res.status(401).send('Unauthorized');
      }

      // set webhook
      if (this.util.isEmpty(req.body.events)) {
        return res.status(200).json({ message: 'ok' });
      }

      return this.line.handleEvent(req, res, next);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}
