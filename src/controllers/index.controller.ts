import { NextFunction, Request, Response } from "express";
import axios from "axios";
import _ from "underscore";
import { ExchangeService } from "../services/exchange.service";
import { LineService } from "../services/line.service";
import { AirvisualService } from "../services/airvisual.service";
import CryptoInfo from "interfaces/crypto.interface";
import * as crypto from "crypto";
import { getConsolation } from "../utils/wording";
import { Utils } from '../utils/util';
import HttpException from "../exceptions/HttpException";

class IndexController {
  private token = `Bearer ${process.env.LINE_TOKEN}`;
  private LINE_MESSAGING_API = process.env.LINE_MESSAGING_API;

  private LINE_HEADER = {
    "Content-Type": "application/json",
    Authorization: this.token,
  };
  private utils = new Utils();
  private exchangeService = new ExchangeService();
  private airvisualService = new AirvisualService();
  private lineService = new LineService();

  public webhook = (req: Request, res: Response, next: NextFunction) => {
    try {
      const text = JSON.stringify(req.body);
      // Generate Signature by HMAC-SHA256 algorithm using LINE Channel Secret and request body(JSON)
      const signature = crypto
        .createHmac("SHA256", process.env.LINE_CHANNEL_SECRET)
        .update(text)
        .digest("base64")
        .toString();

      // Compare your signature and header's signature
      if (signature !== req.headers["x-line-signature"]) {
        return res.status(401).send("Unauthorized");
      }

      // set webhook
      if (_.isEmpty(req.body.events)) {
        res.status(200).json({ message: "ok" });
        return;
      }
      return this.handleEvent(req, res, next);
    } catch (error) {
      console.error(error);
      next(error);
    }
  };

  public handleEvent(req: Request, res: Response, next: NextFunction) {
    const events = req.body.events;
    for (const event of events) {
      if (event.type === "message") {
        if (event.message.type === "text") {
          return this.handleLogin(req, event.message.text);
        } else if (event.message.type === "sticker") {
          return this.handleSticker(req, event);
        } else if (event.message.type === "location") {
          return this.handleLocation(req, event);
        } else {
          next(new HttpException(400, `Unknown message: ${JSON.stringify(event.message)}`));
        }
      } else {
        next(new HttpException(400, `Unknown event: ${JSON.stringify(event)}`));
      }
    }
  }

  public async handleLogin(req: Request, message: string) {
    // reject not en lang
    if (message.charAt(0) !== "/") return;
    const isPermission = await this.lineService.findByUserId(req.body.events[0].source.userId);
    if (!_.isEmpty(isPermission) && this.utils.compareDate(isPermission.expiresIn, new Date().toISOString())
    ) {
      this.handleText(req, message);
    } else {
      const payload = this.lineService.bubbleSignIn();
      return this.sendMessage(req, this.flexMessage(payload));
    }
  }

  public async handleText(req: Request, message: string) {
    let commandList: any[] = message.split(" ");
    let command: string = "";
    let currency: any[] = [];
    commandList.forEach((_command: string, index: number) => {
      if (index === 0) {
        command = _command.slice(1, _command.length).toLowerCase();
      } else if (!_.isEqual(_command, "")) {
        currency.push(_command);
      }
    });
    this.handleCommand(command, currency, req);
  }

  public handleSticker(req: Request, event: any) {
    if (
      event.message.keywords.includes("Sad" || "Crying" || "Tears" || "anguish")
    ) {
      const text = getConsolation();
      this.sendMessage(req, [{ type: "text", text: text }]);
    }
  }

  public async handleLocation(req: Request, event: any) {
    try {
      const location: any = await this.airvisualService.getNearestCity(
        event.message.latitude,
        event.message.longitude
      );
      const msg = this.airvisualService.getNearestCityBubble(
        location.data.current.pollution.aqius,
        location.data.current.pollution.ts
      );
      this.sendMessage(req, this.flexMessage(msg));
    } catch (err) {
      console.log(err.message);
    }
  }

  async handleCommand(command: string, currency: any[], req: Request) {
    const exchangeName = command
    if (exchangeName === "bk" || exchangeName === "bitkub") {
      const promises: any[] = [];
      for (const index in currency) {
        promises.push(this.exchangeService.getBitkub(currency[index]));
      }
      await this.getFlexMessage(req, promises);

    } else if (exchangeName === "st" || exchangeName === "satang") {
      const promises: any[] = [];

      for (const index in currency) {
        promises.push(this.exchangeService.getSatangcorp(currency[index]));
      }
      await this.getFlexMessage(req, promises);

    } else if (exchangeName === "btz" || exchangeName === "bitazza") {
      const promises: any[] = [];

      for (const index in currency) {
        promises.push(this.exchangeService.getBitazza(currency[index]));
      }
      await this.getFlexMessage(req, promises);

    } else if (exchangeName === "bn" || exchangeName === "binance" || exchangeName === "bnbusd") {
      const promises: any[] = [];
      const pairtCurrency: string = exchangeName === "bnbusd" ? "BUSD" : "USDT";
      for (const index in currency) {
        promises.push(this.exchangeService.getBinance(currency[index], pairtCurrency));
      }
      await this.getFlexMessage(req, promises);
    } else if (exchangeName === "gate" || exchangeName === "gateio" || exchangeName === "gt") {
      const promises: any[] = [];

      currency.forEach((_currency: any) => {
        promises.push(this.exchangeService.getGeteio(_currency));
      });

      await this.getFlexMessage(req, promises);

    } else if (exchangeName === "ftx") {
      const promises: any[] = [];

      currency.forEach((_currency: any) => {
        promises.push(this.exchangeService.getFtx(_currency));
      });

      await this.getFlexMessage(req, promises);

    } else if (exchangeName === "mexc" || exchangeName === "mx") {
      const promises: any[] = [];

      currency.forEach((_currency: any) => {
        promises.push(this.exchangeService.getMexc(_currency));
      });

      await this.getFlexMessage(req, promises);

    } else if (exchangeName === "cmc" || exchangeName === "coinmarketcap") {
      const promises: any[] = [];

      currency.forEach((_currency: any) => {
        promises.push(this.exchangeService.getCoinMarketCap(_currency));
      });

      await this.getFlexMessage(req, promises);
    } else if (exchangeName === "gold" || exchangeName === "?????????") {
      this.exchangeService.getGoldPrice()
        .then((data: any) => {
          const msg = this.lineService.goldBubble(data);
          const payload = this.flexMessage(msg);
          this.sendMessage(req, payload);
        })
        .catch((err: any) => {
          console.error(err);
          this.replyNotFound(req);
        })
    } else if (exchangeName === "gas" || exchangeName === "??????????????????") {
      if (currency.length === 0) this.replyNotFound(req);
      this.exchangeService.getGasPrice(currency[0])
        .then((data: any) => {
          const msg = this.lineService.gasBubble(currency[0], data);
          if (!msg) {
            this.replyNotFound(req);
          }
          const payload = this.flexMessage(msg);
          this.sendMessage(req, payload);
        })
        .catch((err: any) => {
          console.error(err);
          this.replyNotFound(req);
        })
    }
  }

  async getFlexMessage(req: any, data: any) {
    return await Promise.all(data)
      .then((items) => {
        if (_.isUndefined(items[0])) {
          this.replyNotFound(req);
          return;
        }
        this.replyRaw(req, items);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }

  public replyRawDeFi = (req: Request, currency: any, item: any) => {
    const datetime = new Date().toLocaleString("th-TH", {
      timeZone: "Asia/Bangkok",
      hour12: false,
    });

    let objBnb: any = {};
    // Satang Pro (???????????????????????????????????? Float)
    objBnb.lastPrice =
      "$" +
      parseFloat(item.rate)
        .toFixed(3)
        .toString()
        .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","); // ??????????????????????????????
    objBnb.highPrice =
      "$" +
      parseFloat(item.allTimeHighUSD)
        .toFixed(3)
        .toString()
        .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","); // ??????????????????????????????
    objBnb.volume =
      "$" +
      parseFloat(item.volume)
        .toFixed(3)
        .toString()
        .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","); // ????????????????????????????????????

    var payload = [
      {
        type: "flex",
        altText: `${item.name}`,
        contents: {
          type: "bubble",
          size: "mega",
          body: {
            type: "box",
            layout: "vertical",
            contents: [
              {
                type: "box",
                layout: "baseline",
                contents: [
                  {
                    type: "icon",
                    size: "3xl",
                    url: `${item.png64}`,
                  },
                  {
                    type: "text",
                    text: `${item.name}`,
                    weight: "bold",
                    size: "xl",
                    margin: "md",
                    offsetTop: "-1.5%",
                  },
                ],
              },
              {
                type: "separator",
                margin: "xxl",
              },
              {
                type: "box",
                layout: "vertical",
                margin: "xxl",
                spacing: "sm",
                contents: [
                  {
                    type: "box",
                    layout: "horizontal",
                    contents: [
                      {
                        type: "text",
                        text: "??????????????????????????????",
                        size: "sm",
                        color: "#555555",
                        flex: 0,
                      },
                      {
                        type: "text",
                        text: `${objBnb.lastPrice}`,
                        size: "xl",
                        color: "#111111",
                        align: "end",
                      },
                    ],
                  },
                  {
                    type: "box",
                    layout: "horizontal",
                    contents: [
                      {
                        type: "text",
                        text: "??????????????????????????????",
                        size: "sm",
                        color: "#555555",
                        flex: 0,
                      },
                      {
                        type: "text",
                        text: `${objBnb.highPrice}`,
                        size: "sm",
                        color: "#111111",
                        align: "end",
                      },
                    ],
                  },
                  {
                    type: "box",
                    layout: "horizontal",
                    contents: [
                      {
                        type: "text",
                        text: "??????????????????????????????",
                        size: "sm",
                        color: "#555555",
                        flex: 0,
                      },
                      {
                        type: "text",
                        text: `${objBnb.volume}`,
                        size: "sm",
                        color: "#111111",
                        align: "end",
                      },
                    ],
                  },
                ],
              },
              {
                type: "separator",
                margin: "xxl",
              },
              {
                type: "box",
                layout: "horizontal",
                margin: "md",
                contents: [
                  {
                    type: "text",
                    text: "??????????????????",
                    size: "xs",
                    color: "#aaaaaa",
                    flex: 0,
                  },
                  {
                    type: "text",
                    text: `${datetime}`,
                    color: "#aaaaaa",
                    size: "xs",
                    align: "end",
                  },
                ],
              },
            ],
          },
          styles: {
            footer: {
              separator: true,
            },
          },
        },
      },
    ];
    this.sendMessage(req.body.events[0].replyToken, payload);
  };



  private replyNotFound(req: Request) {
    const msg = [
      {
        type: "bubble",
        size: "giga",
        body: {
          type: "box",
          layout: "vertical",
          contents: [
            {
              type: "image",
              url: "https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif",
              size: "full",
              aspectMode: "cover",
              aspectRatio: "4:3",
              gravity: "top",
              animated: true,
            },
            {
              type: "box",
              layout: "vertical",
              contents: [
                {
                  type: "box",
                  layout: "vertical",
                  contents: [
                    {
                      type: "text",
                      text: "...?????????????????????????????????????????????????????????",
                      size: "xl",
                      color: "#383E56",
                      weight: "bold",
                    },
                  ],
                },
                {
                  type: "box",
                  layout: "baseline",
                  contents: [
                    {
                      type: "text",
                      text: "????????????????????????????????????????????????????????????????????????????????????!",
                      color: "#383E56",
                      size: "sm",
                      flex: 0,
                    },
                  ],
                  spacing: "lg",
                },
              ],
              position: "relative",
              offsetBottom: "0px",
              offsetStart: "0px",
              offsetEnd: "0px",
              backgroundColor: "#FABEA7",
              paddingAll: "20px",
              paddingTop: "18px",
            },
            {
              type: "box",
              layout: "vertical",
              contents: [
                {
                  type: "text",
                  text: "404",
                  color: "#ffffff",
                  align: "center",
                  size: "xs",
                  offsetTop: "3px",
                  weight: "bold",
                },
              ],
              position: "absolute",
              cornerRadius: "20px",
              offsetTop: "18px",
              backgroundColor: "#ff334b",
              offsetStart: "18px",
              height: "25px",
              width: "53px",
            },
          ],
          paddingAll: "0px",
        },
      },
    ];
    const payload = this.flexMessage(msg);
    this.sendMessage(req, payload);
  }

  public replyRaw = async (
    req: Request,
    cryptoInfoItems: CryptoInfo[]
  ) => {

    let bubbleItems: any[] = [];
    for (const index in cryptoInfoItems) {
      bubbleItems.push(
        this.bubbleMessage(cryptoInfoItems[index])
      );
    }

    Promise.all(bubbleItems)
      .then(async (items) => {
        const payload = this.flexMessage(items);
        this.sendMessage(req, payload);
      })
      .catch((err) => {
        console.error("error: ", err.message);
      });
  };

  sendMessage = (req: Request, payload: any) => {
    try {
      return axios({
        method: "post",
        url: `${this.LINE_MESSAGING_API}/reply`,
        headers: this.LINE_HEADER,
        data: JSON.stringify({
          replyToken: req.body.events[0].replyToken,
          messages: payload,
        }),
      })
    } catch (err) {
      console.error(err);
    }
  };

  pushMessage = async (res: Response, userId: string, payload: any) => {
    try {
      return axios({
        method: "post",
        url: `${this.LINE_MESSAGING_API}/push`,
        headers: this.LINE_HEADER,
        data: JSON.stringify({
          to: userId,
          messages: this.flexMessage(payload),
        }),
      }).then(() => {
        return res.status(200).send(`Done`);
      }).catch((error) => {
        return Promise.reject(error);
      });
    } catch (err) {
      console.error(err);
      return Promise.reject(err);
    }
  };

  bubbleMessage(data: CryptoInfo): any {
    let bubbleMessageTpl = {};

    const boxOne = data.highPrice ?
      this.lineService.createBubbleBox("??????????????????????????????", data.highPrice) :
      this.lineService.createBubbleBox("?????????????????? 24??????.", data.volume_24h);

    const boxTwo = data.lowPrice ?
      this.lineService.createBubbleBox("??????????????????????????????", data.lowPrice) :
      this.lineService.createBubbleBox("????????????????????????", data.cmc_rank || "-");
    const boxThree = this.lineService.createBubbleBox("?????????????????????????????????????????????", data.volume_change_24h, data.priceChangeColor);
    bubbleMessageTpl = {
      type: "bubble",
      size: "mega",
      header: {
        type: "box",
        layout: "baseline",
        contents: [
          {
            type: "icon",
            url: `${data.urlLogo}`,
            size: "4xl",
          },
        ],
        justifyContent: "center",
        alignItems: "center",
        paddingAll: "lg",
        offsetTop: "lg",
      },
      hero: {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "text",
            text: `${data.currencyName}`,
            align: "center",
            size: "xxl",
            weight: "bold",
            color: "#FFFFFF",
          },
        ],
        alignItems: "center",
        justifyContent: "center",
      },
      body: {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "box",
            layout: "baseline",
            contents: [
              {
                type: "icon",
                url: `${data.exchangeLogoUrl}`,
                size: "lg",
              },
              {
                type: "text",
                text: `${data.exchange}`,
                weight: "bold",
                size: "lg",
                offsetTop: "-10.5%",
                color: `${data.textColor}`,
              },
            ],
            spacing: "md",
          },
          {
            type: "box",
            layout: "horizontal",
            contents: [
              {
                type: "text",
                text: "??????????????????????????????",
                size: "lg",
                color: "#8c8c8c",
                weight: "bold",
                margin: "md",
                flex: 0,
                align: "start",
              },
              {
                type: "text",
                text: `${data.lastPrice}`,
                align: "end",
                weight: "bold",
                size: "md",
              },
            ],
            justifyContent: "space-between",
          },
          boxOne,
          boxTwo,
          boxThree,
        ],
        spacing: "sm",
        paddingAll: "13px",
      },
      footer: {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "box",
            layout: "horizontal",
            contents: [
              {
                type: "text",
                text: "??????????????????",
                size: "xs",
                color: "#aaaaaa",
                margin: "md",
                flex: 0,
                align: "start",
              },
              {
                type: "text",
                align: "end",
                size: "xs",
                text: `${data.last_updated}`,
                color: "#aaaaaa",
              },
            ],
            justifyContent: "space-between",
          },
        ],
      },
      styles: {
        header: {
          backgroundColor: "#FABEA7",
        },
        hero: {
          backgroundColor: "#FABEA7",
        },
        footer: {
          separator: true,
        },
      },
    };
    return bubbleMessageTpl;
  }

  flexMessage(bubbleItems: any[]) {
    return [
      {
        type: "flex",
        altText: "CryptoInfo",
        contents: {
          type: "carousel",
          contents: bubbleItems,
        },
      },
    ];
  }
}

export default IndexController;

export interface StypeConfig {
  textColor?: string;
  exchangeNm?: string;
  exchangeLogoUrl?: string;
  priceChangeColor?: string;
}
