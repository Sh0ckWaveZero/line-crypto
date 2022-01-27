import axios from "axios";
import _ from "underscore";
import CryptoInfo from "interfaces/crypto.interface";
import { getCurrencyLogo, mapSymbolsThai } from "../utils/cyptocurrencies";
import { cryptoList } from "../utils/cryptoList";

const regex = new RegExp(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g);
export class ExchangeService {
  getBitkub = async (_currency: any): Promise<CryptoInfo> => {
    const currency = mapSymbolsThai(_currency);
    const response: any = await this.bitkub(currency);
    if (_.isEmpty(response)) return;
    return {
      exchange: "Bitkub",
      exchangeLogoUrl: "https://s2.coinmarketcap.com/static/img/exchanges/128x128/436.png",
      textColor: "#4CBA64",
      currencyName: currency.toUpperCase(),
      lastPrice: this.expo(response.last, "฿"),
      highPrice: this.pirceFormat(response.high24hr, "฿"),
      lowPrice: this.pirceFormat(response.low24hr, "฿"),
      volume_change_24h: this.volumeChangeFormat(response.percentChange),
      priceChangeColor: this.priceChangeColor(response.percentChange),
      last_updated: this.lastUpdateFormat(null),
      urlLogo: await getCurrencyLogo(_currency.toLowerCase()),
    }
  };

  getSatangcorp = async (_currency: any): Promise<CryptoInfo> => {
    const currency = mapSymbolsThai(_currency);
    const response: any = await this.satangcorp(currency);
    if (_.isEmpty(response)) return;
    return {
      exchange: "Satang Pro",
      exchangeLogoUrl: "https://s2.coinmarketcap.com/static/img/exchanges/128x128/325.png",
      textColor: "#1717d1",
      currencyName: currency.toUpperCase(),
      lastPrice: this.expo(response.lastPrice, "฿"),
      highPrice: this.pirceFormat(response.highPrice, "฿"),
      lowPrice: this.pirceFormat(response.lowPrice, "฿"),
      volume_change_24h: this.volumeChangeFormat(response.priceChange),
      priceChangeColor: this.priceChangeColor(response.priceChange),
      last_updated: this.lastUpdateFormat(null),
      urlLogo: await getCurrencyLogo(_currency.toLowerCase()),
    }
  };

  getBitazza = async (_currency: string): Promise<CryptoInfo> => {
    const currency = mapSymbolsThai(_currency);
    const response: any = await this.bitazza(currency);
    if (_.isEmpty(response)) return;
    return {
      exchange: "Bitazza",
      exchangeLogoUrl: "https://s2.coinmarketcap.com/static/img/exchanges/128x128/1124.png",
      textColor: "#8FA775",
      currencyName: currency.toUpperCase(),
      lastPrice: this.expo(response.last_price, "฿"),
      highPrice: this.pirceFormat(response.highest_price_24h, "฿"),
      lowPrice: this.pirceFormat(response.lowest_price_24h, "฿"),
      volume_change_24h: this.volumeChangeFormat(response.price_change_percent_24h),
      priceChangeColor: this.priceChangeColor(response.price_change_percent_24h),
      last_updated: this.lastUpdateFormat(null),
      urlLogo: await getCurrencyLogo(_currency.toLowerCase()),
    }
  };

  getBinance = async (_currency: string): Promise<CryptoInfo> => {
    const currency = mapSymbolsThai(_currency);
    const response: any = await this.binance(currency);
    if (_.isEmpty(response)) return;
    return {
      exchange: "Binance",
      exchangeLogoUrl: "https://s2.coinmarketcap.com/static/img/exchanges/128x128/270.png",
      textColor: "#F0B909",
      currencyName: currency.toUpperCase(),
      lastPrice: this.expo(response.lastPrice, "$"),
      highPrice: this.pirceFormat(response.highPrice, "$"),
      lowPrice: this.pirceFormat(response.lowPrice, "$"),
      volume_change_24h: this.volumeChangeFormat(response.priceChangePercent),
      priceChangeColor: this.priceChangeColor(response.priceChangePercent),
      last_updated: this.lastUpdateFormat(null),
      urlLogo: await getCurrencyLogo(_currency.toLowerCase()),
    }
  };

  getGeteio = async (_currency: string): Promise<CryptoInfo> => {
    const currency = mapSymbolsThai(_currency);
    const response: any = await this.geteio(currency);
    if (_.isEmpty(response)) return;
    return {
      exchange: "Gate.io",
      exchangeLogoUrl: "https://s2.coinmarketcap.com/static/img/exchanges/128x128/302.png",
      textColor: "#CE615E",
      currencyName: currency.toUpperCase(),
      lastPrice: this.expo(response.last, "$"),
      highPrice: this.pirceFormat(response.high_24h, "$"),
      lowPrice: this.pirceFormat(response.low_24h, "$"),
      volume_change_24h: this.volumeChangeFormat(response.change_percentage),
      priceChangeColor: this.priceChangeColor(response.change_percentage),
      last_updated: this.lastUpdateFormat(null),
      urlLogo: await getCurrencyLogo(_currency.toLowerCase()),
    }
  };

  getMexc = async (_currency: string): Promise<CryptoInfo> => {
    const currency = mapSymbolsThai(_currency);
    const response: any = await this.mexc(currency);
    if (_.isEmpty(response)) return;
    return {
      exchange: "MEXC",
      exchangeLogoUrl: "https://s2.coinmarketcap.com/static/img/exchanges/128x128/544.png",
      textColor: "#47DC90",
      currencyName: currency.toUpperCase(),
      lastPrice: this.expo(response.last, "$"),
      highPrice: this.pirceFormat(response.high, "$"),
      lowPrice: this.pirceFormat(response.low, "$"),
      volume_change_24h: this.volumeChangeFormat(response.change_rate),
      priceChangeColor: this.priceChangeColor(response.change_rate),
      last_updated: this.lastUpdateFormat(null),
      urlLogo: await getCurrencyLogo(_currency.toLowerCase()),
    }
  };

  getFtx = async (_currency: string): Promise<CryptoInfo> => {
    const currency = mapSymbolsThai(_currency);
    const response: any = await this.ftx(currency);
    if (_.isEmpty(response)) return;
    return {
      exchange: "FTX",
      exchangeLogoUrl: "https://s2.coinmarketcap.com/static/img/exchanges/128x128/524.png",
      textColor: "#2BB4CA",
      currencyName: currency.toUpperCase(),
      lastPrice: this.expo(response.last, "$"),
      volume_24h: this.expo(response.volumeUsd24h, "$"),
      volume_change_24h: this.volumeChangeFormat(response.change24h),
      priceChangeColor: this.priceChangeColor(response.change24h),
      last_updated: this.lastUpdateFormat(null),
      urlLogo: await getCurrencyLogo(_currency.toLowerCase()),
    }
  };

  getCoinMarketCap = async (_currency: string): Promise<CryptoInfo> => {
    const currency = mapSymbolsThai(_currency);
    const response: any = await this.cmc(currency);
    const quote = response.quote.USD;
    if (_.isEmpty(response)) return;
    return {
      exchange: "CoinMarketCap",
      exchangeLogoUrl: "https://coinmarketcap.com/apple-touch-icon.png",
      textColor: "#3861FB",
      currencyName: response.name,
      lastPrice: this.expo(quote.price, "$"),
      volume_24h: this.expo(quote.volume_24h, "$"),
      cmc_rank: response.cmc_rank,
      volume_change_24h: this.volumeChangeFormat(quote.percent_change_24h),
      priceChangeColor: this.priceChangeColor(quote.percent_change_24h),
      last_updated: this.lastUpdateFormat(quote.last_updated),
      urlLogo: await getCurrencyLogo(_currency.toLowerCase()),
    }
  };

  getDeficurrency = async (_currency: string): Promise<any> => {
    const currency = mapSymbolsThai(_currency);
    let obj: CryptoInfo;
    const response: any = await this.defi(currency)
      .then((item: any) => {
        if (_.isEmpty(item)) return;
      })
      .catch((err: any) => {
        console.error(err);
      });
    return obj;
  };

  private bitkub = async (currencyName: string): Promise<any> => {
    try {
      const response: any = await axios.get(
        `https://api.bitkub.com/api/market/ticker?sym=THB_${currencyName.toUpperCase()}`
      );
      for (let key of Object.keys(response.data)) {
        let value = response.data[key];
        return value;
      }
    } catch (error) {
      console.error(error);
    }
  };

  private binance = async (currencyName: string): Promise<any> => {
    try {
      return await axios
        .get(
          `https://api.binance.com/api/v3/ticker/24hr?symbol=${currencyName.toUpperCase()}USDT`
        )
        .then((item: any) => {
          return item.data;
        });
    } catch (error) {
      console.error(error);
    }
  };

  private bitazza = async (currencyName: string): Promise<any> => {
    try {
      const response: any = await axios.get(
        `https://apexapi.bitazza.com:8443/AP/summary`
      );
      for (let key in response.data) {
        let value = response.data[key];
        if (value.trading_pairs === `${currencyName.toUpperCase()}_THB`) {
          return value;
        }
      }
    } catch (error) {
      console.error("bitazza is error: ", error);
    }
  };

  private geteio = async (currencyName: string): Promise<any> => {
    try {
      const response: any = await axios.get(
        `https://api.gateio.ws/api/v4/spot/tickers`
      );
      for (let key in response.data) {
        let value = response.data[key];
        if (value.currency_pair === `${currencyName.toUpperCase()}_USDT`) {
          return value;
        }
      }
    } catch (error) {
      console.error("gateio is error: ", error);
    }
  };

  private ftx = async (currencyName: string): Promise<any> => {
    try {
      const response: any = await axios.get(
        `https://ftx.com/api/markets/${currencyName}_USD`
      );
      return response.data.result;
    } catch (error) {
      console.error("FTX is error: ", error);
    }
  };

  private mexc = async (currencyName: string): Promise<any> => {
    try {
      const response: any = await axios.get(
        `https://www.mexc.com/open/api/v2/market/ticker?symbol=${currencyName}_USDT`
      );
      return response.data.data[0];
    } catch (error) {
      console.error("mexc is error: ", error);
    }
  };

  private cmc = async (currencyName: string): Promise<any> => {
    try {
      const coin = currencyName.toUpperCase();
      const currencyId: string = cryptoList
        .filter((item: any) => item.name === coin)
        .map((element: any) => element.id)[0];
      const config: any = {
        method: 'get',
        url: process.env.CMC_URL + `/v1/cryptocurrency/quotes/latest?id=${currencyId}`,
        headers: {
          'X-CMC_PRO_API_KEY': process.env.CMC_API_KEY
        }
      };
      return await axios(config).then(async (response) => {
        return await response.data.data?.[`${currencyId}`];
      })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.error("CoinMarkerCap is error: ", error);
    }
  };

  private defi = async (message: string): Promise<any> => {
    try {
      const data = JSON.stringify({
        currency: "USD",
        code: message.toUpperCase(),
        meta: true,
      });
      const config: any = {
        method: "post",
        url: "https://api.livecoinwatch.com/coins/single",
        headers: {
          "x-api-key": process.env.X_APT_KEY,
          "Content-Type": "application/json",
        },
        data: data,
      };
      const response = await axios(config);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  private satangcorp = async (currencyName: string): Promise<any> => {
    try {
      const response = await axios.get(
        `https://satangcorp.com/api/v3/ticker/24hr?symbol=${currencyName}_thb`
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  private async mapCryptoInfo(
    exchange: string,
    currencyName: any,
    lastPrice: any,
    highPrice: any,
    lowPrice: any,
    changePrice: any
  ): Promise<CryptoInfo> {
    const isSymbol =
      exchange === "bn" ||
      exchange === "gate" ||
      exchange === "ftx" ||
      exchange === "cmc" ||
      exchange === "CoinMarketCap" ||
      exchange === "mexc";
    const symbol = isSymbol ? "$ " : "฿ "
    return {
      currencyName: currencyName,
      lastPrice: exchange === "CoinMarketCap" ? this.expo(lastPrice, symbol) : this.pirceFormat(lastPrice, symbol),
      highPrice: this.pirceFormat(highPrice, symbol),
      lowPrice: this.pirceFormat(lowPrice, symbol),
      changePrice: this.volumeChangeFormat(changePrice),
      changePriceOriginal: changePrice,
      urlLogo: await getCurrencyLogo(currencyName.toLowerCase()),
    };
  }

  private expo(price: string, symbol: string) {
    const _price = Number(price);
    if (_price > 1) {
      return symbol + " " + Number.parseFloat(price).toFixed(3).toString()
        .replace(regex, ",");
    } else if (_price > 0.00001) {
      return this.customPriceFormat(price, 5, symbol);
    } else {
      return this.customPriceFormat(price, 5, symbol);
    }
  }

  private pirceFormat(price: string, symbol: string) {
    return symbol + " " + parseFloat(price).toString()
      .replace(regex, ",")
  }

  private customPriceFormat(price: string, digit: number, symbol: string) {
    return symbol + " " +
      Number.parseFloat(price)
        .toExponential(digit).toString()
        .replace(regex, ",");
  }

  private volumeChangeFormat(price: string) {
    return (Number(price) > 0 ? "+" : "") +
      parseFloat(price).toFixed(2).toString()
        .replace(regex, ",") + "%"
  }

  private lastUpdateFormat(lastUpdate: string | number) {
    lastUpdate = lastUpdate ? lastUpdate : new Date().toLocaleString();
    return new Date(lastUpdate).toLocaleString("th-TH", {
      timeZone: "Asia/Bangkok",
      hour12: false,
    });
  }

  private priceChangeColor(price: string) {
    return Number(price) > 0 ? "#00D666" : "#F74C6C";
  }
}
