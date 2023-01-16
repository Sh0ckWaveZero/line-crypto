import { CONSOLATION, IMAGE_URLS } from '../constant/common.constant';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import type { NextFunction, Request, Response } from 'express';

import { AirVisualService } from './airvisual.service';
import { ConfigService } from './config.service';
import { CryptoInfo } from '../interface/crypto.interface';
import { DatabaseService } from './database.service';
import { ExchangeService } from './exchange.service';
import { OpenAiService } from './openai.service';
import { UtilService } from './util.service';
import axios from 'axios';

@Injectable()
export class LineService {
  lineHeader = {};
  constructor(
    private readonly util: UtilService,
    private readonly db: DatabaseService,
    private readonly config: ConfigService,
    private readonly exchange: ExchangeService,
    private readonly airVisual: AirVisualService,
    private readonly openai: OpenAiService,
  ) {
    this.lineHeader = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.config.get('line.channelAccessToken')}`,
    };
  }

  public handleEvent(req: Request, res: Response, next: NextFunction): any {
    const events = req.body.events;
    events.forEach((event: any) => {
      switch (event.type) {
        case 'message':
          switch (event.message.type) {
            case 'text':
              this.handleLogin(req, event.message.text);
              break;
            case 'sticker':
              this.handleSticker(req, event);
              break;
            case 'location':
              this.handleLocation(req, event);
              break;
            default:
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
              break;
          }
          break;
        default:
          next(
            new HttpException(
              {
                status: HttpStatus.BAD_REQUEST,
                error: 'Bad Request',
                message: `Unknown event: ${JSON.stringify(event)}`,
              },
              HttpStatus.BAD_REQUEST,
            ),
          );
          break;
      }
    });
  }

  private async handleLogin(req: Request, message: string) {
    const prefix = message[0];

    // reject not en lang
    if (prefix !== '/' && prefix !== '$') {
      return;
    }

    const userId = req.body.events[0].source.userId;
    const userPermission: any = await this.db.findByUserId(userId);

    if (
      !userPermission ||
      !this.util.compareDate(userPermission.expiresIn, new Date().toISOString())
    ) {
      const payload = this.bubbleSignIn();
      return this.sendMessage(req, this.flexMessage(payload));
    }

    if (prefix === '/') {
      this.handleText(req, message);
    } else if (prefix === '$') {
      const prompt = message.slice(1, message.length);
      const text = await this.openai.getCompletion(prompt);
      return this.sendMessage(req, [
        {
          type: `text`,
          text: text.data.choices[0].text,
        },
      ]);
    }
  }

  private async handleText(req: Request, message: string): Promise<void> {
    const commandList = message.split(' ');
    const command = commandList[0].slice(1).toLowerCase();
    const currency = commandList.slice(1).filter((c) => c !== '');
    this.handleCommand(command, currency, req);
  }

  private handleSticker(req: Request, event: any) {
    const keywords: string[] = ['Sad', 'Crying', 'Tears', 'anguish'];
    if (event.message.keywords.some((k: any) => keywords.includes(k))) {
      const text: string = this.util.randomItems(CONSOLATION);
      this.sendMessage(req, [{ type: 'text', text: text }]);
    }
  }

  private async handleLocation(req: Request, event: any) {
    try {
      const location: any = await this.airVisual.getNearestCity(
        event.message.latitude,
        event.message.longitude,
      );
      const msg = this.airVisual.getNearestCityBubble(
        location.data.current.pollution.aqius,
        location.data.current.pollution.ts,
      );
      this.sendMessage(req, this.flexMessage(msg));
    } catch (err) {
      console.log(err.message);
    }
  }

  private async handleCommand(command: string, currency: any[], req: Request) {
    const exchangeName = command;
    let promises: any[] = [];

    switch (exchangeName) {
      case 'bk' || 'bitkub':
        currency.forEach((_currency: any) => {
          promises.push(this.exchange.getBitkub(_currency));
        });
        break;
      case 'st' || 'satang':
        currency.forEach((_currency: any) => {
          promises.push(this.exchange.getSatangCorp(_currency));
        });
        break;
      case 'btz' || 'bitazza':
        currency.forEach((_currency: any) => {
          promises.push(this.exchange.getBitazza(_currency));
        });
        break;
      case 'bn' || 'binance':
        currency.forEach((_currency: any) => {
          promises.push(this.exchange.getBinance(_currency, 'USDT'));
        });
        break;
      case 'bnbusd':
        currency.forEach((_currency: any) => {
          promises.push(this.exchange.getBinance(_currency, 'BUSD'));
        });
        break;
      case 'gate' || 'gateio' || 'gt':
        currency.forEach((_currency: any) => {
          promises.push(this.exchange.getGeteio(_currency));
        });
        break;
      case 'ftx':
        currency.forEach((_currency: any) => {
          promises.push(this.exchange.getFtx(_currency));
        });
        break;
      case 'mexc' || 'mx':
        currency.forEach((_currency: any) => {
          promises.push(this.exchange.getMexc(_currency));
        });
        break;
      case 'cmc' || 'coinmarketcap':
        currency.forEach((_currency: any) => {
          promises.push(this.exchange.getCoinMarketCap(_currency));
        });
        break;
      case 'gold' || 'ทอง':
        promises = [this.exchange.getGoldPrice()];
        break;
      case 'gas' || 'น้ำมัน':
        if (currency.length === 0) this.replyNotFound(req);
        promises = [this.exchange.getGasPrice(currency[0])];
        break;
      default:
        this.replyNotFound(req);
        return;
    }

    await this.getFlexMessage(req, promises);
  }

  private flexMessage(bubbleItems: any[]) {
    return [
      {
        type: 'flex',
        altText: 'CryptoInfo',
        contents: {
          type: 'carousel',
          contents: bubbleItems,
        },
      },
    ];
  }

  private async getFlexMessage(req: any, data: any[]) {
    try {
      const items = await Promise.all(data);
      if (this.util.isEmpty(items[0])) {
        this.replyNotFound(req);
        return;
      }
      this.replyRaw(req, items);
    } catch (err) {
      console.error(err.message);
    }
  }

  private replyRaw = async (req: Request, cryptoInfoItems: any[]) => {
    const bubbleItems: any[] = [];
    for (const index in cryptoInfoItems) {
      bubbleItems.push(this.bubbleMessage(cryptoInfoItems[index]));
    }

    Promise.all(bubbleItems)
      .then(async (items) => {
        const payload = this.flexMessage(items);
        this.sendMessage(req, payload);
      })
      .catch((err) => {
        console.error('error: ', err.message);
      });
  };

  private replyNotFound(req: Request) {
    const msg = [
      {
        type: 'bubble',
        size: 'giga',
        body: {
          type: 'box',
          layout: 'vertical',
          contents: [
            {
              type: 'image',
              url: 'https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif',
              size: 'full',
              aspectMode: 'cover',
              aspectRatio: '4:3',
              gravity: 'top',
              animated: true,
            },
            {
              type: 'box',
              layout: 'vertical',
              contents: [
                {
                  type: 'box',
                  layout: 'vertical',
                  contents: [
                    {
                      type: 'text',
                      text: '...ข่อยขอบอกอีหยั่งแน่',
                      size: 'xl',
                      color: '#383E56',
                      weight: 'bold',
                    },
                  ],
                },
                {
                  type: 'box',
                  layout: 'baseline',
                  contents: [
                    {
                      type: 'text',
                      text: 'ตัวเจ้าเลือกเบิ่งมันบ่มีเด้อ!',
                      color: '#383E56',
                      size: 'sm',
                      flex: 0,
                    },
                  ],
                  spacing: 'lg',
                },
              ],
              position: 'relative',
              offsetBottom: '0px',
              offsetStart: '0px',
              offsetEnd: '0px',
              backgroundColor: '#FABEA7',
              paddingAll: '20px',
              paddingTop: '18px',
            },
            {
              type: 'box',
              layout: 'vertical',
              contents: [
                {
                  type: 'text',
                  text: '404',
                  color: '#ffffff',
                  align: 'center',
                  size: 'xs',
                  offsetTop: '3px',
                  weight: 'bold',
                },
              ],
              position: 'absolute',
              cornerRadius: '20px',
              offsetTop: '18px',
              backgroundColor: '#ff334b',
              offsetStart: '18px',
              height: '25px',
              width: '53px',
            },
          ],
          paddingAll: '0px',
        },
      },
    ];
    const payload = this.flexMessage(msg);
    this.sendMessage(req, payload);
  }

  private sendMessage = (req: Request, payload: any) => {
    try {
      return axios({
        method: 'post',
        url: `${this.config.get('line.messagingApi')}/reply`,
        headers: this.lineHeader,
        data: JSON.stringify({
          replyToken: req.body.events[0].replyToken,
          messages: payload,
        }),
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  private bubbleSignIn = () => {
    const image = this.util.randomItems(IMAGE_URLS);
    const bubble = [
      {
        type: 'bubble',
        hero: {
          type: 'image',
          size: 'full',
          aspectRatio: '20:13',
          aspectMode: 'cover',
          url: `${image}`,
        },
        body: {
          type: 'box',
          layout: 'vertical',
          spacing: 'sm',
          contents: [
            {
              type: 'text',
              text: 'TO THE MOON 🚀 🌕',
              wrap: true,
              weight: 'bold',
              size: 'md',
              color: '#B2A4FF',
            },
            {
              type: 'box',
              layout: 'baseline',
              contents: [
                {
                  type: 'text',
                  text: '🫢 คุณยังไม่ได้ลงชื่อใช้งานหรือเซสชันหมด ช่วยลงชื่อเข้าใช้งานก่อนนะจ๊ะ',
                  wrap: true,
                  weight: 'bold',
                  size: 'sm',
                  flex: 0,
                  margin: 'none',
                },
              ],
              margin: 'lg',
            },
          ],
        },
        footer: {
          type: 'box',
          layout: 'vertical',
          spacing: 'sm',
          contents: [
            {
              type: 'button',
              style: 'primary',
              action: {
                type: 'uri',
                label: '🔑 เข้าสู่ระบบ ',
                uri: `${this.config.get('client')}`,
              },
              color: '#14C38E',
            },
          ],
        },
      },
    ];
    return bubble;
  };

  private bubbleMessage(data: CryptoInfo): any {
    let bubbleMessageTpl = {};

    const boxOne = data.highPrice
      ? this.createBubbleBox('ราคาสูงสุด', data.highPrice)
      : this.createBubbleBox('ปริมาณ 24ชม.', data.volume_24h);

    const boxTwo = data.lowPrice
      ? this.createBubbleBox('ราคาต่ำสุด', data.lowPrice)
      : this.createBubbleBox('ลำดับที่', data.cmc_rank || '-');
    const boxThree = this.createBubbleBox(
      'ราคาเปลี่ยนแปลง',
      data.volume_change_24h,
      data.priceChangeColor,
    );
    bubbleMessageTpl = {
      type: 'bubble',
      size: 'mega',
      header: {
        type: 'box',
        layout: 'baseline',
        contents: [
          {
            type: 'icon',
            url: `${data.urlLogo}`,
            size: '4xl',
          },
        ],
        justifyContent: 'center',
        alignItems: 'center',
        paddingAll: 'lg',
        offsetTop: 'lg',
      },
      hero: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'text',
            text: `${data.currencyName}`,
            align: 'center',
            size: 'xxl',
            weight: 'bold',
            color: '#FFFFFF',
          },
        ],
        alignItems: 'center',
        justifyContent: 'center',
      },
      body: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'box',
            layout: 'baseline',
            contents: [
              {
                type: 'icon',
                url: `${data.exchangeLogoUrl}`,
                size: 'lg',
              },
              {
                type: 'text',
                text: `${data.exchange}`,
                weight: 'bold',
                size: 'lg',
                offsetTop: '-10.5%',
                color: `${data.textColor}`,
              },
            ],
            spacing: 'md',
          },
          {
            type: 'box',
            layout: 'horizontal',
            contents: [
              {
                type: 'text',
                text: 'ราคาล่าสุด',
                size: 'lg',
                color: '#8c8c8c',
                weight: 'bold',
                margin: 'md',
                flex: 0,
                align: 'start',
              },
              {
                type: 'text',
                text: `${data.lastPrice}`,
                align: 'end',
                weight: 'bold',
                size: 'md',
              },
            ],
            justifyContent: 'space-between',
          },
          boxOne,
          boxTwo,
          boxThree,
        ],
        spacing: 'sm',
        paddingAll: '13px',
      },
      footer: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'box',
            layout: 'horizontal',
            contents: [
              {
                type: 'text',
                text: 'วันที่',
                size: 'xs',
                color: '#aaaaaa',
                margin: 'md',
                flex: 0,
                align: 'start',
              },
              {
                type: 'text',
                align: 'end',
                size: 'xs',
                text: `${data.last_updated}`,
                color: '#aaaaaa',
              },
            ],
            justifyContent: 'space-between',
          },
        ],
      },
      styles: {
        header: {
          backgroundColor: '#FABEA7',
        },
        hero: {
          backgroundColor: '#FABEA7',
        },
        footer: {
          separator: true,
        },
      },
    };
    return bubbleMessageTpl;
  }

  private createBubbleBox = (
    text = '',
    value = '',
    priceChangeColor = '#454545',
  ): any => {
    return {
      type: 'box',
      layout: 'horizontal',
      contents: [
        {
          type: 'text',
          text: `${text}`,
          size: 'xs',
          color: '#8c8c8c',
          margin: 'md',
          flex: 0,
          align: 'start',
        },
        {
          type: 'text',
          text: `${value}`,
          align: 'end',
          size: 'xs',
          color: `${priceChangeColor}`,
        },
      ],
      justifyContent: 'space-between',
    };
  };
}
