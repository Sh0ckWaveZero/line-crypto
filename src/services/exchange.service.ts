import axios from "axios";
import * as cheerio from 'cheerio';
import _ from "underscore";
import CryptoInfo from "interfaces/crypto.interface";
import { getCurrencyLogo, mapSymbolsThai } from "../utils/cyptocurrencies";
import { CmcService } from './cmc.service';
import { Utils } from '../utils/util';

export class ExchangeService {

  cmcService = new CmcService();
  utils = new Utils();

  getBitkub = async (_currency: any): Promise<CryptoInfo> => {
    const currency = mapSymbolsThai(_currency);
    const response: any = await this.bitkub(currency);
    if (_.isEmpty(response)) return;
    return {
      exchange: "Bitkub",
      exchangeLogoUrl: "https://s2.coinmarketcap.com/static/img/exchanges/128x128/436.png",
      textColor: "#4CBA64",
      currencyName: await this.cmcService.findOneCoinName(currency.toUpperCase()),
      lastPrice: this.utils.pirceFormat(response.last, "฿"),
      highPrice: this.utils.pirceFormat(response.high24hr, "฿"),
      lowPrice: this.utils.pirceFormat(response.low24hr, "฿"),
      volume_change_24h: this.utils.volumeChangeFormat(response.percentChange),
      priceChangeColor: this.utils.priceChangeColor(response.percentChange),
      last_updated: this.utils.lastUpdateFormat(null),
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
      currencyName: await this.cmcService.findOneCoinName(currency.toUpperCase()),
      lastPrice: this.utils.pirceFormat(response.lastPrice, "฿"),
      highPrice: this.utils.pirceFormat(response.highPrice, "฿"),
      lowPrice: this.utils.pirceFormat(response.lowPrice, "฿"),
      volume_change_24h: this.utils.volumeChangeFormat(response.priceChange),
      priceChangeColor: this.utils.priceChangeColor(response.priceChange),
      last_updated: this.utils.lastUpdateFormat(null),
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
      currencyName: await this.cmcService.findOneCoinName(currency.toUpperCase()),
      lastPrice: this.utils.expo(response.last_price, "฿"),
      highPrice: this.utils.pirceFormat(response.highest_price_24h, "฿"),
      lowPrice: this.utils.pirceFormat(response.lowest_price_24h, "฿"),
      volume_change_24h: this.utils.volumeChangeFormat(response.price_change_percent_24h),
      priceChangeColor: this.utils.priceChangeColor(response.price_change_percent_24h),
      last_updated: this.utils.lastUpdateFormat(null),
      urlLogo: await getCurrencyLogo(_currency.toLowerCase()),
    }
  };

  getBinance = async (_currency: string, pairCurrency: string): Promise<CryptoInfo> => {
    const currency = mapSymbolsThai(_currency);
    const response: any = await this.binance(currency, pairCurrency);
    if (_.isEmpty(response)) return;
    return {
      exchange: "Binance",
      exchangeLogoUrl: "https://s2.coinmarketcap.com/static/img/exchanges/128x128/270.png",
      textColor: "#F0B909",
      currencyName: await this.cmcService.findOneCoinName(currency.toUpperCase()),
      lastPrice: this.utils.pirceFormat(response.lastPrice, "$"),
      highPrice: this.utils.pirceFormat(response.highPrice, "$"),
      lowPrice: this.utils.pirceFormat(response.lowPrice, "$"),
      volume_change_24h: this.utils.volumeChangeFormat(response.priceChangePercent),
      priceChangeColor: this.utils.priceChangeColor(response.priceChangePercent),
      last_updated: this.utils.lastUpdateFormat(null),
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
      currencyName: await this.cmcService.findOneCoinName(currency.toUpperCase()),
      lastPrice: this.utils.pirceFormat(response.last, "$"),
      highPrice: this.utils.pirceFormat(response.high_24h, "$"),
      lowPrice: this.utils.pirceFormat(response.low_24h, "$"),
      volume_change_24h: this.utils.volumeChangeFormat(response.change_percentage),
      priceChangeColor: this.utils.priceChangeColor(response.change_percentage),
      last_updated: this.utils.lastUpdateFormat(null),
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
      currencyName: await this.cmcService.findOneCoinName(currency.toUpperCase()),
      lastPrice: this.utils.pirceFormat(response.last, "$"),
      highPrice: this.utils.pirceFormat(response.high, "$"),
      lowPrice: this.utils.pirceFormat(response.low, "$"),
      volume_change_24h: this.utils.volumeChangeFormat(response.change_rate),
      priceChangeColor: this.utils.priceChangeColor(response.change_rate),
      last_updated: this.utils.lastUpdateFormat(null),
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
      currencyName: await this.cmcService.findOneCoinName(currency.toUpperCase()),
      lastPrice: this.utils.expo(response.last, "$"),
      volume_24h: this.utils.expo(response.volumeUsd24h, "$"),
      volume_change_24h: this.utils.volumeChangeFormat(response.change24h),
      priceChangeColor: this.utils.priceChangeColor(response.change24h),
      last_updated: this.utils.lastUpdateFormat(null),
      urlLogo: await getCurrencyLogo(_currency.toLowerCase()),
    }
  };

  getCoinMarketCap = async (_currency: string): Promise<CryptoInfo> => {
    const currency = mapSymbolsThai(_currency);
    const response: any = await this.cmc(currency);
    if (_.isEmpty(response)) return;
    const quote = response.quote.USD;
    return {
      exchange: "CoinMarketCap",
      exchangeLogoUrl: "https://coinmarketcap.com/apple-touch-icon.png",
      textColor: "#3861FB",
      currencyName: response.name,
      lastPrice: this.utils.expo(quote.price, "$"),
      volume_24h: this.utils.expo(quote.volume_24h, "$"),
      cmc_rank: response.cmc_rank,
      volume_change_24h: this.utils.volumeChangeFormat(quote.percent_change_24h),
      priceChangeColor: this.utils.priceChangeColor(quote.percent_change_24h),
      last_updated: this.utils.lastUpdateFormat(quote.last_updated),
      urlLogo: await getCurrencyLogo(_currency.toLowerCase()),
    }
  };

  getCmcList = async (start: number, limit: number) => {
    const res: any = await this.cmcList(start, limit);
    await this.cmcService.addCointList(res);
  }

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

  private binance = async (currencyName: string, pairt: string = 'USDT'): Promise<any> => {
    try {
      return await axios
        .get(
          `https://api.binance.com/api/v3/ticker/24hr?symbol=${currencyName.toUpperCase()}${pairt.toUpperCase()}`
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
      const currencyId: string = await this.cmcService.findOneCoinName(coin);
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

  private cmcList = async (start: number, limit: number): Promise<any> => {
    try {
      const config: any = {
        method: 'get',
        url: process.env.CMC_URL + `/v1/cryptocurrency/map?start=${start}&limit=${limit}`,
        headers: {
          'X-CMC_PRO_API_KEY': process.env.CMC_API_KEY
        }
      };
      return await axios(config).then(async (response) => {
        console.log(response?.data?.data);
        return await response?.data?.data;
      })
        .catch((error) => {
          console.log(error.response.data);
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
      })
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

  getGoldPrice = async (): Promise<any> => {
    try {
      const goldPrice: any = {};
      // Fetch HTML
      const { data }: any = await axios.get('https://www.goldtraders.or.th/');
      // Load HTML
      const $: any = cheerio.load(data);
      // Select div items
      goldPrice.lastUpdate = $('span#DetailPlace_uc_goldprices1_lblAsTime b').text().trim();
      goldPrice.barSell = $('span#DetailPlace_uc_goldprices1_lblBLSell b').text().trim();
      goldPrice.barSellColor = this.utils.priceColor($('span#DetailPlace_uc_goldprices1_lblBLSell b font').attr('color'));
      goldPrice.barBuy = $('span#DetailPlace_uc_goldprices1_lblBLBuy b').text().trim();
      goldPrice.barBuyColor = this.utils.priceColor($('span#DetailPlace_uc_goldprices1_lblBLBuy b font').attr('color'));
      goldPrice.jewelrySell = $('span#DetailPlace_uc_goldprices1_lblOMSell b').text().trim();
      goldPrice.jewelrySellColor = this.utils.priceColor($('span#DetailPlace_uc_goldprices1_lblOMSell b font').attr('color'));
      goldPrice.jewelryBuy = $('span#DetailPlace_uc_goldprices1_lblOMBuy b').text().trim();
      goldPrice.jewelryBuyColor = this.utils.priceColor($('span#DetailPlace_uc_goldprices1_lblOMBuy b font').attr('color'));
      return goldPrice;
    } catch (error) {
      console.error(error);
    }
  };

  getGasPrice = async (provider: string): Promise<any> => {
    try {
      // Fetch HTML
      const { data }: any = await axios.get('http://gasprice.kapook.com/gasprice.php');
      // Load HTML
      const $: any = cheerio.load(data);
      // Select div items
      let gasPrice: any = [];
      // Select div items
      const providerName = $(`article.gasprice.${provider} > header > h3`).text();
      $(`article.gasprice.${provider} > ul > li`).each((i: any, elem: any) => {
        gasPrice.push({
          name: $(elem).find('span').text(),
          value: $(elem).find('em').text(),
        });
      });
      return {
        providerName: providerName,
        gasPrice: gasPrice,
      }
    } catch (error) {
      console.error(error);
    }
  };
}
