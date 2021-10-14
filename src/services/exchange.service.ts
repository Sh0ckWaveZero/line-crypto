import axios from "axios";
import _ from "underscore";
import CryptoInfo from "interfaces/crypto.interface";
import { mapSymbolsThai } from "../utils/cyptocurrencies";


export class ExchangeService {

  getBitkub = async (_currency: any): Promise<CryptoInfo> => {
    const currency = mapSymbolsThai(_currency)
    const response: any = await this.bitkub(currency)
    if (_.isEmpty(response)) return
    return this.mapCryptoInfo(
      'bk',
      currency,
      response.last,
      response.high24hr,
      response.low24hr,
      response.change,
    )
  }

  getSatangcorp = async (_currency: any): Promise<CryptoInfo> => {
    const currency = mapSymbolsThai(_currency)
    const response: any = await this.satangcorp(currency)
    if (_.isEmpty(response)) return
    return this.mapCryptoInfo(
      'st',
      currency,
      response.lastPrice,
      response.highPrice,
      response.lowPrice,
      response.priceChange,
    )
  }

  getBitazza = async (_currency: string): Promise<CryptoInfo> => {
    const currency = mapSymbolsThai(_currency)
    const response: any = await this.bitazza(currency)
    if (_.isEmpty(response)) return
    return this.mapCryptoInfo(
      'btz',
      currency,
      response.last_price,
      response.highest_price_24h,
      response.lowest_price_24h,
      response.price_change_percent_24h,
    )
  }

  getBinance = async (_currency: string): Promise<CryptoInfo> => {
    const currency = mapSymbolsThai(_currency)
    const response: any = await this.binance(currency)
    if (_.isEmpty(response)) return
    return this.mapCryptoInfo(
      'bn',
      currency,
      response.lastPrice,
      response.highPrice,
      response.lowPrice,
      response.priceChangePercent,
    )
  }

  getGeteio = async (_currency: string): Promise<CryptoInfo> => {
    const currency = mapSymbolsThai(_currency)
    const response: any = await this.geteio(currency)
    if (_.isEmpty(response)) return
    return this.mapCryptoInfo(
      'gate',
      currency,
      response.last,
      response.high_24h,
      response.low_24h,
      response.change_percentage,
    )
  }

  getDeficurrency = async (_currency: string): Promise<any> => {
    const currency = mapSymbolsThai(_currency)
    let obj: CryptoInfo
    const response: any = await this.defi(currency).then((item: any) => {
      if (_.isEmpty(item)) return

    }).catch((err: any) => {
      console.error(err);
    });
    return obj
  }

  private bitkub = async (currencyName: string): Promise<any> => {
    try {
      const response: any = await axios.get(`https://api.bitkub.com/api/market/ticker?sym=THB_${currencyName.toUpperCase()}`)
      for (let key of Object.keys(response.data)) {
        let value = response.data[key];
        return value
      }
    } catch (error) {
      console.error(error)
    }
  }

  private binance = async (currencyName: string): Promise<any> => {
    try {
      return await axios.get(
        `https://api.binance.com/api/v3/ticker/24hr?symbol=${currencyName.toUpperCase()}USDT`
      ).then((item: any) => {
        return item.data
      })
    } catch (error) {
      console.error(error)
    }
  }

  private bitazza = async (currencyName: string): Promise<any> => {
    try {
      const response: any = await axios.get(
        `https://apexapi.bitazza.com:8443/AP/summary`
      );
      for (let key in response.data) {
        let value = response.data[key];
        if (value.trading_pairs === `${currencyName.toUpperCase()}_THB`) {
          return value
        }
      }
    } catch (error) {
      console.error('bitazza is error: ', error);
    }
  }

  private geteio = async (currencyName: string): Promise<any> => {
    try {
      const response: any = await axios.get(
        `https://api.gateio.ws/api/v4/spot/tickers`
      );
      for (let key in response.data) {
        let value = response.data[key];
        if (value.currency_pair === `${currencyName.toUpperCase()}_USDT`) {
          return value
        }
      }
    } catch (error) {
      console.error('gateio is error: ', error);
    }
  }

  private defi = async (message: string): Promise<any> => {
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

  private satangcorp = async (currencyName: string): Promise<any> => {
    try {
      const response = await axios.get(
        `https://satangcorp.com/api/v3/ticker/24hr?symbol=${currencyName}_thb`
      );
      return response.data
    } catch (error) {
      console.error(error);
    }
  }

  private async mapCryptoInfo(exchange: string, currencyName: any, lastPrice: any, highPrice: any, lowPrice: any, changePrice: any): Promise<CryptoInfo> {
    const regex = new RegExp(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g)
    return {
      currencyName: currencyName,
      lastPrice: (exchange === 'bn' || exchange === 'gate' ? '$ ' : '฿ ') + parseFloat(lastPrice).toString().replace(regex, ","),
      highPrice: (exchange === 'bn' || exchange === 'gate' ? '$ ' : '฿ ') + parseFloat(highPrice).toString().replace(regex, ","),
      lowPrice: (exchange === 'bn' || exchange === 'gate' ? '$ ' : '฿ ') + parseFloat(lowPrice).toString().replace(regex, ","),
      changePrice: (changePrice > 0 ? "+" : '') + parseFloat(changePrice).toFixed(2) + (exchange === 'bn' || exchange === 'gate' || exchange === 'btz' ? '% ' : '฿ '),
      changePriceOriginal: changePrice,
      urlLogo: await this.getCurrencyLogo(currencyName.toLowerCase())
    }
  }

  private getCurrencyLogo = async (currencyName: string): Promise<any> => {
    try {
      const response = await axios.get(
        `https://lcw.nyc3.cdn.digitaloceanspaces.com/production/currencies/64/${currencyName}.webp`
      );
      return response.config.url
    } catch (error) {
      return 'https://cryptoicon-api.vercel.app/api/icon/notfound'
    }
  }

}