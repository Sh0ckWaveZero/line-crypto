import { NextFunction, Request, Response } from 'express';
import axios from 'axios'
import _ from 'underscore';

class IndexController {
  private token = `Bearer ${process.env.LINE_TOKEN}`
  private LINE_MESSAGING_API = process.env.LINE_MESSAGING_API;

  private LINE_HEADER = {
    'Content-Type': 'application/json',
    'Authorization': this.token
  };

  public index = (req: Request, res: Response, next: NextFunction) => {
    try {
      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  }

  public webhook = (req: Request, res: Response, next: NextFunction) => {
    try {
      // set webhook
      if (_.isEmpty(req.body.events)) {
        res.status(200).json({ message: 'ok' });
        return
      }
      return this.handleEvent(req);
    } catch (error) {
      next(error);
    }
  }

  public handleEvent(req: Request) {
    let event = req.body.events[0]
    switch (event.type) {
      case 'message':
        const message = event.message;
        switch (message.type) {
          case 'text':
            return this.handleText(req, message.text);
          default:
            throw new Error(`Unknown message: ${JSON.stringify(message)}`);
        }
      default:
        throw new Error(`Unknown event: ${JSON.stringify(event)}`);
    }
  }

  public handleText(req: Request, message: string) {
    // reject not en lang
    if (message.charAt(0) !== '/') return
    let splitMessage = message.split(" ");
    const exchangeName = splitMessage[0].substr(1, splitMessage[0].length).toLowerCase();
    const currency = splitMessage[1]
    if (exchangeName === 'bk') {
      this.bitkub(currency).then((item: any) => {
        if (_.isEmpty(item)) return
        let objBk: any = {}
        // Bitkub (กำหนดให้เป็น Float)
        objBk.lastPrice = parseFloat(item.last).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + '฿' // ราคาล่าสุด
        objBk.highPrice = parseFloat(item.high24hr).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + '฿' // ราคาสูงสุด
        objBk.lowPrice = parseFloat(item.low24hr).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + '฿' // ราคาต่ำสุด
        objBk.changePrice = parseFloat(item.change).toFixed(2).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + '฿' // ราคาเปลี่ยนแปลงปัจจุบัน และกำหนด 2 decimal
        objBk.changePriceOriginal = item.change
        this.replyRaw(req, currency, exchangeName, objBk);
      }).catch((err: any) => {
        console.error(err);
      });
    } else if (exchangeName === 'st') {
      this.satangcorp(currency).then((item: any) => {
        if (_.isEmpty(item)) return
        let objSt: any = {}
        // Satang Pro (กำหนดให้เป็น Float)
        objSt.lastPrice = parseFloat(item.lastPrice).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + ' ฿' // ราคาล่าสุด
        objSt.highPrice = parseFloat(item.highPrice).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + ' ฿' // ราคาสูงสุด
        objSt.lowPrice = parseFloat(item.lowPrice).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + ' ฿' // ราคาต่ำสุด
        objSt.changePrice = parseFloat(item.priceChange).toFixed(2).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + ' ฿' // ราคาเปลี่ยนแปลงปัจจุบัน และกำหนด 2 decimal
        objSt.changePriceOriginal = item.priceChange
        this.replyRaw(req, currency, exchangeName, objSt);
      }).catch((err: any) => {
        console.error(err);
      });
    } else if (exchangeName === 'btz') {
      this.bitazza(currency).then((item: any) => {
        if (_.isEmpty(item)) return
        let objBtz: any = {}
        // Satang Pro (กำหนดให้เป็น Float)
        objBtz.lastPrice = parseFloat(item.last_price).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + '฿' // ราคาล่าสุด
        objBtz.highPrice = parseFloat(item.highest_price_24h).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + '฿' // ราคาสูงสุด
        objBtz.lowPrice = parseFloat(item.lowest_price_24h).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + '฿' // ราคาต่ำสุด
        objBtz.changePrice = parseFloat(item.price_change_percent_24h).toFixed(2) + '%' // ราคาเปลี่ยนแปลงปัจจุบัน และกำหนด 2 decimal
        objBtz.changePriceOriginal = item.price_change_percent_24h
        this.replyRaw(req, currency, exchangeName, objBtz);
      }).catch((err: any) => {
        console.error(err);
      });
    } else if (exchangeName === 'bnb') {
      this.binance(currency).then((item: any) => {
        let objBnb: any = {}
        // Satang Pro (กำหนดให้เป็น Float)
        objBnb.lastPrice = '$' + parseFloat(item.lastPrice).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") // ราคาล่าสุด
        objBnb.highPrice = '$' + parseFloat(item.highPrice).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") // ราคาสูงสุด
        objBnb.lowPrice = '$' + parseFloat(item.lowPrice).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") // ราคาต่ำสุด
        objBnb.changePrice = parseFloat(item.priceChangePercent).toFixed(2) + '%' // ราคาเปลี่ยนแปลงปัจจุบัน และกำหนด 2 decimal
        objBnb.changePriceOriginal = item.priceChangePercent
        this.replyRaw(req, currency, exchangeName, objBnb);
      }).catch((err: any) => {
        console.error(err);
      });
    } else if (exchangeName === 'defi') {
      this.defi(currency).then((item: any) => {
        this.replyRawDeFi(req, currency, item);
      }).catch((err: any) => {
        console.error(err);
      });
    }
  }


  public satangcorp = async (message: string): Promise<any> => {
    try {
      const response = await axios.get(
        `https://satangcorp.com/api/v3/ticker/24hr?symbol=${message}_thb`
      );
      return response.data
    } catch (error) {
      console.error(error);
    }
  }

  public bitkub = async (message: string): Promise<any> => {
    try {
      const response: any = await axios.get(`https://api.bitkub.com/api/market/ticker?sym=THB_${message.toUpperCase()}`)
      for (let key of Object.keys(response.data)) {
        let value = response.data[key];
        return value
      }
    } catch (error) {
      console.error(error)
    }
  }

  public binance = async (message: string): Promise<any> => {
    try {
      const response = await axios.get(
        `https://api.binance.com/api/v3/ticker/24hr?symbol=${message.toUpperCase()}USDT`
      );
      return response.data
    } catch (error) {
      console.error(error)
    }
  }

  public bitazza = async (message: string): Promise<any> => {
    try {
      const response = await axios.get(
        `https://apexapi.bitazza.com:8443/AP/summary`
      );
      for (let key in response.data) {
        let value = response.data[key];
        if (value.trading_pairs === `${message.toUpperCase()}_THB`) {
          return value
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  public defi = async (message: string): Promise<any> => {
    try {
      const data = JSON.stringify({
        "currency": "USD",
        "code": message.toUpperCase(),
        "meta": true
      });
      const config: any = {
        method: 'post',
        url: 'https://api.livecoinwatch.com/coins/single',
        headers: {
          'x-api-key': process.env.X_APT_KEY,
          'Content-Type': 'application/json'
        },
        data: data
      };
      const response = await axios(config)
      return response.data
    } catch (error) {
      console.error(error);
    }
  }

  public replyRawDeFi = (req: any, currency: any, item: any) => {
    const datetime = new Date().toLocaleString("th-TH", {
      timeZone: "Asia/Bangkok",
      hour12: false
    });

    let objBnb: any = {}
    // Satang Pro (กำหนดให้เป็น Float)
    objBnb.lastPrice = '$' + parseFloat(item.rate).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") // ราคาล่าสุด
    objBnb.highPrice = '$' + parseFloat(item.allTimeHighUSD).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") // ราคาสูงสุด
    objBnb.volume = '$' + parseFloat(item.volume).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") // ปริมาณมาเทรด


    var payload = [{
      "type": "flex",
      "altText": `${item.name}`,
      "contents": {
        "type": "bubble",
        "size": "mega",
        "body": {
          "type": "box",
          "layout": "vertical",
          "contents": [{
            "type": "box",
            "layout": "baseline",
            "contents": [{
              "type": "icon",
              "size": "3xl",
              "url": `${item.png64}`,
            }, {
              "type": "text",
              "text": `${item.name}`,
              "weight": "bold",
              "size": "xxl",
              "margin": "md",
              "offsetTop": "-1.5%",
            },]
          },
          {
            "type": "separator",
            "margin": "xxl"
          },
          {
            "type": "box",
            "layout": "vertical",
            "margin": "xxl",
            "spacing": "sm",
            "contents": [
              {
                "type": "box",
                "layout": "horizontal",
                "contents": [{
                  "type": "text",
                  "text": "ราคาล่าสุด",
                  "size": "sm",
                  "color": "#555555",
                  "flex": 0
                },
                {
                  "type": "text",
                  "text": `${objBnb.lastPrice}`,
                  "size": "xl",
                  "color": "#111111",
                  "align": "end"
                }
                ]
              },
              {
                "type": "box",
                "layout": "horizontal",
                "contents": [{
                  "type": "text",
                  "text": "ราคาสูงสุด",
                  "size": "sm",
                  "color": "#555555",
                  "flex": 0
                },
                {
                  "type": "text",
                  "text": `${objBnb.highPrice}`,
                  "size": "sm",
                  "color": "#111111",
                  "align": "end"
                }
                ]
              },
              {
                "type": "box",
                "layout": "horizontal",
                "contents": [{
                  "type": "text",
                  "text": "ปริมาณเทรด",
                  "size": "sm",
                  "color": "#555555",
                  "flex": 0
                },
                {
                  "type": "text",
                  "text": `${objBnb.volume}`,
                  "size": "sm",
                  "color": "#111111",
                  "align": "end"
                }
                ]
              },
            ]
          },
          {
            "type": "separator",
            "margin": "xxl"
          },
          {
            "type": "box",
            "layout": "horizontal",
            "margin": "md",
            "contents": [{
              "type": "text",
              "text": "วันที่",
              "size": "xs",
              "color": "#aaaaaa",
              "flex": 0
            },
            {
              "type": "text",
              "text": `${datetime}`,
              "color": "#aaaaaa",
              "size": "xs",
              "align": "end"
            }
            ]
          }
          ]
        },
        "styles": {
          "footer": {
            "separator": true
          }
        }
      }
    }]
    return axios({
      method: 'post',
      url: `${this.LINE_MESSAGING_API}/reply`,
      headers: this.LINE_HEADER,
      data:
        JSON.stringify({
          replyToken: req.body.events[0].replyToken,
          messages: payload
        })
    });
  }


  public replyRaw = (req: any, currency: any, exchange: any, value: any) => {
    var datetime = new Date().toLocaleString("th-TH", {
      timeZone: "Asia/Bangkok",
      hour12: false
    });

    let textColor = ""
    let exchangeNm = ""
    let exchangeLogoUrl = ""
    let priceChangeColor = ""

    if (exchange === 'bk') {
      textColor = '#333333'
      exchangeNm = 'bitkub'
      exchangeLogoUrl = 'https://i.ibb.co/Qr2z2qX/bk.png'
    }

    if (exchange === 'st') {
      textColor = '#1717d1'
      exchangeNm = 'Satang Pro'
      exchangeLogoUrl = 'https://i.ibb.co/Df59mGn/st.png'
    }

    if (exchange === 'btz') {
      textColor = '#8FA775'
      exchangeNm = 'Bitazza'
      exchangeLogoUrl = 'https://i.ibb.co/7Vs6CP9/btz.png'
    }

    if (exchange === 'bnb') {
      textColor = '#F0B909'
      exchangeNm = 'Binance'
      exchangeLogoUrl = 'https://cryptologos.cc/logos/binance-coin-bnb-logo.png'
    }

    if (value.changePriceOriginal > 0) {
      priceChangeColor = '#00D666'
    } else {
      priceChangeColor = '#F74C6C'
    }

    var payload = [{
      "type": "flex",
      "altText": `${currency.toUpperCase()}`,
      "contents": {
        "type": "bubble",
        "size": "mega",
        "body": {
          "type": "box",
          "layout": "vertical",
          "contents": [{
            "type": "box",
            "layout": "baseline",
            "contents": [{
              "type": "icon",
              "size": "3xl",
              "url": `https://cryptoicon-api.vercel.app/api/icon/${currency}`,
            }, {
              "type": "text",
              "text": `${currency.toUpperCase()}`,
              "weight": "bold",
              "size": "xxl",
              "margin": "md",
              "offsetTop": "-1.5%",
            },]
          },
          {
            "type": "separator",
            "margin": "xxl"
          },
          {
            "type": "box",
            "layout": "vertical",
            "margin": "xxl",
            "spacing": "sm",
            "contents": [{
              "type": "box",
              "layout": "baseline",
              "contents": [{
                "type": "icon",
                "size": "xl",
                "url": `${exchangeLogoUrl}`,
              },
              {
                "type": "text",
                "text": `${exchangeNm}`,
                "size": "sm",
                "color": `${textColor}`,
                "margin": "md",
                "flex": 0,
                "weight": "bold",
                "offsetTop": "-25%",
              }
              ]
            },
            {
              "type": "box",
              "layout": "horizontal",
              "contents": [{
                "type": "text",
                "text": "ราคาล่าสุด",
                "size": "sm",
                "color": "#555555",
                "flex": 0
              },
              {
                "type": "text",
                "text": `${value.lastPrice}`,
                "size": "xl",
                "color": "#111111",
                "align": "end"
              }
              ]
            },
            {
              "type": "box",
              "layout": "horizontal",
              "contents": [{
                "type": "text",
                "text": "ราคาสูงสุด",
                "size": "sm",
                "color": "#555555",
                "flex": 0
              },
              {
                "type": "text",
                "text": `${value.highPrice}`,
                "size": "sm",
                "color": "#111111",
                "align": "end"
              }
              ]
            },
            {
              "type": "box",
              "layout": "horizontal",
              "contents": [{
                "type": "text",
                "text": "ราคาต่ำสุด",
                "size": "sm",
                "color": "#555555",
                "flex": 0
              },
              {
                "type": "text",
                "text": `${value.lowPrice}`,
                "size": "sm",
                "color": "#111111",
                "align": "end"
              }
              ]
            },
            {
              "type": "box",
              "layout": "horizontal",
              "contents": [{
                "type": "text",
                "text": "ราคาเปลี่ยนแปลง",
                "size": "sm",
                "color": "#555555",
                "flex": 0
              },
              {
                "type": "text",
                "text": `${value.changePrice}`,
                "size": "sm",
                "color": `${priceChangeColor}`,
                "align": "end"
              }
              ]
            },
            ]
          },
          {
            "type": "separator",
            "margin": "xxl"
          },
          {
            "type": "box",
            "layout": "horizontal",
            "margin": "md",
            "contents": [{
              "type": "text",
              "text": "วันที่",
              "size": "xs",
              "color": "#aaaaaa",
              "flex": 0
            },
            {
              "type": "text",
              "text": `${datetime}`,
              "color": "#aaaaaa",
              "size": "xs",
              "align": "end"
            }
            ]
          }
          ]
        },
        "styles": {
          "footer": {
            "separator": true
          }
        }
      }
    }]
    return axios({
      method: 'post',
      url: `${this.LINE_MESSAGING_API}/reply`,
      headers: this.LINE_HEADER,
      data:
        JSON.stringify({
          replyToken: req.body.events[0].replyToken,
          messages: payload
        })
    });
  }
}

export default IndexController;
