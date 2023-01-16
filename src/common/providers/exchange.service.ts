import * as cheerio from 'cheerio';

import { CmcService } from './cmc.service';
import { CryptoCurrencyService } from './cryptoCurrency.service';
import { CryptoInfo } from '../interface/crypto.interface';
import { Injectable } from '@nestjs/common';
import { UtilService } from './util.service';
import axios from 'axios';
import { ConfigService } from './config.service';

@Injectable()
export class ExchangeService {
  constructor(
    private readonly cmcService: CmcService,
    private readonly util: UtilService,
    private readonly cryptoCurrency: CryptoCurrencyService,
    private readonly config: ConfigService,
  ) { }

  getBitkub = async (_currency: any): Promise<CryptoInfo> => {
    const currency = this.cryptoCurrency.mapSymbolsThai(_currency);
    const response: any = await this.bitkub(currency);
    if (this.util.isEmpty(response)) return;

    const cryptoInfo = await this.cmcService.findOne(currency.toUpperCase());
    const logoInfo = await this.cryptoCurrency.getCurrencyLogo(
      _currency.toLowerCase(),
    );

    return {
      exchange: 'Bitkub',
      exchangeLogoUrl:
        'https://s2.coinmarketcap.com/static/img/exchanges/128x128/436.png',
      textColor: '#4CBA64',
      currencyName: cryptoInfo.name,
      lastPrice: this.util.priceFormat(response.last, '฿'),
      highPrice: this.util.priceFormat(response.high24hr, '฿'),
      lowPrice: this.util.priceFormat(response.low24hr, '฿'),
      volume_change_24h: this.util.volumeChangeFormat(response.percentChange),
      priceChangeColor: this.util.priceChangeColor(response.percentChange),
      last_updated: this.util.lastUpdateFormat(null),
      urlLogo: logoInfo,
    };
  };

  getSatangCorp = async (_currency: any): Promise<CryptoInfo> => {
    const currency = this.cryptoCurrency.mapSymbolsThai(_currency);
    const response: any = await this.satangCorp(currency);
    if (this.util.isEmpty(response)) return;

    const cryptoInfo = await this.cmcService.findOne(currency.toUpperCase());
    const logoInfo = await this.cryptoCurrency.getCurrencyLogo(
      _currency.toLowerCase(),
    );

    return {
      exchange: 'Satang Pro',
      exchangeLogoUrl:
        'https://s2.coinmarketcap.com/static/img/exchanges/128x128/325.png',
      textColor: '#1717d1',
      currencyName: cryptoInfo.name,
      lastPrice: this.util.priceFormat(response.lastPrice, '฿'),
      highPrice: this.util.priceFormat(response.highPrice, '฿'),
      lowPrice: this.util.priceFormat(response.lowPrice, '฿'),
      volume_change_24h: this.util.volumeChangeFormat(response.priceChange),
      priceChangeColor: this.util.priceChangeColor(response.priceChange),
      last_updated: this.util.lastUpdateFormat(null),
      urlLogo: logoInfo,
    };
  };

  getBitazza = async (_currency: string): Promise<CryptoInfo> => {
    const currency = this.cryptoCurrency.mapSymbolsThai(_currency);
    const response: any = await this.bitazza(currency);
    if (this.util.isEmpty(response)) return;

    const cryptoInfo = await this.cmcService.findOne(currency.toUpperCase());
    const logoInfo = await this.cryptoCurrency.getCurrencyLogo(
      _currency.toLowerCase(),
    );

    return {
      exchange: 'Bitazza',
      exchangeLogoUrl:
        'https://s2.coinmarketcap.com/static/img/exchanges/128x128/1124.png',
      textColor: '#8FA775',
      currencyName: cryptoInfo.name,
      lastPrice: this.util.expo(response.last_price, '฿'),
      highPrice: this.util.priceFormat(response.highest_price_24h, '฿'),
      lowPrice: this.util.priceFormat(response.lowest_price_24h, '฿'),
      volume_change_24h: this.util.volumeChangeFormat(
        response.price_change_percent_24h,
      ),
      priceChangeColor: this.util.priceChangeColor(
        response.price_change_percent_24h,
      ),
      last_updated: this.util.lastUpdateFormat(null),
      urlLogo: logoInfo,
    };
  };

  getBinance = async (
    _currency: string,
    pairCurrency: string,
  ): Promise<CryptoInfo> => {
    const currency = this.cryptoCurrency.mapSymbolsThai(_currency);
    const response: any = await this.binance(currency, pairCurrency);
    if (this.util.isEmpty(response)) return;

    const cryptoInfo = await this.cmcService.findOne(currency.toUpperCase());
    const logoInfo = await this.cryptoCurrency.getCurrencyLogo(
      _currency.toLowerCase(),
    );

    return {
      exchange: 'Binance',
      exchangeLogoUrl:
        'https://s2.coinmarketcap.com/static/img/exchanges/128x128/270.png',
      textColor: '#F0B909',
      currencyName: cryptoInfo.name,
      lastPrice: this.util.priceFormat(response.lastPrice, '$'),
      highPrice: this.util.priceFormat(response.highPrice, '$'),
      lowPrice: this.util.priceFormat(response.lowPrice, '$'),
      volume_change_24h: this.util.volumeChangeFormat(
        response.priceChangePercent,
      ),
      priceChangeColor: this.util.priceChangeColor(response.priceChangePercent),
      last_updated: this.util.lastUpdateFormat(null),
      urlLogo: logoInfo,
    };
  };

  getGeteio = async (_currency: string): Promise<CryptoInfo> => {
    const currency = this.cryptoCurrency.mapSymbolsThai(_currency);
    const response: any = await this.geteIO(currency);
    if (this.util.isEmpty(response)) return;

    const cryptoInfo = await this.cmcService.findOne(currency.toUpperCase());
    const logoInfo = await this.cryptoCurrency.getCurrencyLogo(
      _currency.toLowerCase(),
    );

    return {
      exchange: 'Gate.io',
      exchangeLogoUrl:
        'https://s2.coinmarketcap.com/static/img/exchanges/128x128/302.png',
      textColor: '#CE615E',
      currencyName: cryptoInfo.name,
      lastPrice: this.util.priceFormat(response.last, '$'),
      highPrice: this.util.priceFormat(response.high_24h, '$'),
      lowPrice: this.util.priceFormat(response.low_24h, '$'),
      volume_change_24h: this.util.volumeChangeFormat(
        response.change_percentage,
      ),
      priceChangeColor: this.util.priceChangeColor(response.change_percentage),
      last_updated: this.util.lastUpdateFormat(null),
      urlLogo: logoInfo,
    };
  };

  getMexc = async (_currency: string): Promise<CryptoInfo> => {
    const currency = this.cryptoCurrency.mapSymbolsThai(_currency);
    const response: any = await this.mexc(currency);
    if (this.util.isEmpty(response)) return;

    const cryptoInfo = await this.cmcService.findOne(currency.toUpperCase());
    const logoInfo = await this.cryptoCurrency.getCurrencyLogo(
      _currency.toLowerCase(),
    );

    return {
      exchange: 'MEXC',
      exchangeLogoUrl:
        'https://s2.coinmarketcap.com/static/img/exchanges/128x128/544.png',
      textColor: '#47DC90',
      currencyName: cryptoInfo.name,
      lastPrice: this.util.priceFormat(response.last, '$'),
      highPrice: this.util.priceFormat(response.high, '$'),
      lowPrice: this.util.priceFormat(response.low, '$'),
      volume_change_24h: this.util.volumeChangeFormat(response.change_rate),
      priceChangeColor: this.util.priceChangeColor(response.change_rate),
      last_updated: this.util.lastUpdateFormat(null),
      urlLogo: logoInfo,
    };
  };

  getFtx = async (_currency: string): Promise<CryptoInfo> => {
    const currency = this.cryptoCurrency.mapSymbolsThai(_currency);
    const response: any = await this.ftx(currency);
    if (this.util.isEmpty(response)) return;

    const cryptoInfo = await this.cmcService.findOne(currency.toUpperCase());
    const logoInfo = await this.cryptoCurrency.getCurrencyLogo(
      _currency.toLowerCase(),
    );

    return {
      exchange: 'FTX',
      exchangeLogoUrl:
        'https://s2.coinmarketcap.com/static/img/exchanges/128x128/524.png',
      textColor: '#2BB4CA',
      currencyName: cryptoInfo.name,
      lastPrice: this.util.expo(response.last, '$'),
      volume_24h: this.util.expo(response.volumeUsd24h, '$'),
      volume_change_24h: this.util.volumeChangeFormat(response.change24h),
      priceChangeColor: this.util.priceChangeColor(response.change24h),
      last_updated: this.util.lastUpdateFormat(null),
      urlLogo: logoInfo,
    };
  };

  getCoinMarketCap = async (_currency: string): Promise<CryptoInfo> => {
    const currency = this.cryptoCurrency.mapSymbolsThai(_currency);
    const response: any = await this.cmc(currency);
    if (this.util.isEmpty(response)) return;

    const quote = response.quote.USD;
    const logoInfo = await this.cryptoCurrency.getCurrencyLogo(
      _currency.toLowerCase(),
    );

    return {
      exchange: 'CoinMarketCap',
      exchangeLogoUrl: 'https://coinmarketcap.com/apple-touch-icon.png',
      textColor: '#3861FB',
      currencyName: response.name,
      lastPrice: this.util.expo(quote.price, '$'),
      volume_24h: this.util.expo(quote.volume_24h, '$'),
      cmc_rank: response.cmc_rank,
      volume_change_24h: this.util.volumeChangeFormat(quote.percent_change_24h),
      priceChangeColor: this.util.priceChangeColor(quote.percent_change_24h),
      last_updated: this.util.lastUpdateFormat(quote.last_updated),
      urlLogo: logoInfo,
    };
  };

  getCmcList = async (start: number, limit: number) => {
    const res: any = await this.cmcList(start, limit);
    await this.cmcService.addCoinsList(res);
  };

  getDefiCurrency = async (_currency: string): Promise<any> => {
    const currency = this.cryptoCurrency.mapSymbolsThai(_currency);
    let obj: CryptoInfo;
    await this.defi(currency)
      .then((item: any) => {
        if (this.util.isEmpty(item)) return;
      })
      .catch((err: any) => {
        console.error(err);
      });
    return obj;
  };

  private bitkub = async (currencyName: string): Promise<any> => {
    try {
      const response: any = await axios.get(
        `https://api.bitkub.com/api/market/ticker?sym=THB_${currencyName.toUpperCase()}`,
      );
      for (const key of Object.keys(response.data)) {
        const value = response.data[key];
        return value;
      }
    } catch (error) {
      console.error(error);
    }
  };

  private binance = async (
    currencyName: string,
    pairs = 'USDT',
  ): Promise<any> => {
    try {
      return await axios
        .get(
          `https://api.binance.com/api/v3/ticker/24hr?symbol=${currencyName.toUpperCase()}${pairs.toUpperCase()}`,
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
        `https://apexapi.bitazza.com:8443/AP/summary`,
      );
      for (const key in response.data) {
        const value = response.data[key];
        if (value.trading_pairs === `${currencyName.toUpperCase()}_THB`) {
          return value;
        }
      }
    } catch (error) {
      console.error('bitazza is error: ', error);
    }
  };

  private geteIO = async (currencyName: string) => {
    try {
      const { data } = await axios.get(
        `https://api.gateio.ws/api/v4/spot/tickers`,
      );
      return data.filter(
        (val: any) =>
          val.currency_pair === `${currencyName.toUpperCase()}_USDT`,
      );
    } catch (error) {
      console.error(`gateio error: ${error}`);
    }
  };

  private ftx = async (currencyName: string): Promise<any> => {
    try {
      const { data }: any = await axios.get(
        `https://ftx.com/api/markets/${currencyName}_USD`,
      );
      return data.result;
    } catch (error) {
      console.error('FTX is error: ', error);
    }
  };

  private mexc = async (currencyName: string): Promise<any> => {
    try {
      const { data }: any = await axios.get(
        `https://www.mexc.com/open/api/v2/market/ticker?symbol=${currencyName}_USDT`,
      );
      return data.data[0];
    } catch (error) {
      console.error('mexc is error: ', error);
    }
  };

  private cmc = async (currencyName: string): Promise<any> => {
    try {
      const coin = currencyName.toUpperCase();
      const cryptoInfo = await this.cmcService.findOne(coin);
      const config: any = {
        method: 'get',
        url:
          this.config.get('cmc.url') +
          `/v1/cryptocurrency/quotes/latest?id=${cryptoInfo.id}`,
        headers: {
          'X-CMC_PRO_API_KEY': this.config.get('cmc.apiKey'),
        },
      };
      return await axios(config)
        .then(async (response) => {
          return await response.data.data?.[`${cryptoInfo}`];
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.error('CoinMarkerCap is error: ', error);
    }
  };

  private cmcList = async (start: number, limit: number): Promise<any> => {
    try {
      const config: any = {
        method: 'get',
        url:
          this.config.get('cmc.url') +
          `/v1/cryptocurrency/map?start=${start}&limit=${limit}`,
        headers: {
          'X-CMC_PRO_API_KEY': this.config.get('cmc.apiKey'),
        },
      };
      return await axios(config)
        .then(async (response) => {
          console.log(response?.data?.data);
          return await response?.data?.data;
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    } catch (error) {
      console.error('CoinMarkerCap is error: ', error);
    }
  };

  private defi = async (message: string): Promise<any> => {
    try {
      const data = JSON.stringify({
        currency: 'USD',
        code: message.toUpperCase(),
        meta: true,
      });
      const config: any = {
        method: 'post',
        url: 'https://api.livecoinwatch.com/coins/single',
        headers: {
          'x-api-key': this.config.get('cmc.apiKey'),
          'Content-Type': 'application/json',
        },
        data: data,
      };
      const response = await axios(config);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  private satangCorp = async (currencyName: string): Promise<any> => {
    try {
      const response = await axios.get(
        `https://satangcorp.com/api/v3/ticker/24hr?symbol=${currencyName}_thb`,
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
      goldPrice.lastUpdate = $('span#DetailPlace_uc_goldprices1_lblAsTime b')
        .text()
        .trim();
      goldPrice.barSell = $('span#DetailPlace_uc_goldprices1_lblBLSell b')
        .text()
        .trim();
      goldPrice.barSellColor = this.util.priceColor(
        $('span#DetailPlace_uc_goldprices1_lblBLSell b font').attr('color'),
      );
      goldPrice.barBuy = $('span#DetailPlace_uc_goldprices1_lblBLBuy b')
        .text()
        .trim();
      goldPrice.barBuyColor = this.util.priceColor(
        $('span#DetailPlace_uc_goldprices1_lblBLBuy b font').attr('color'),
      );
      goldPrice.jewelrySell = $('span#DetailPlace_uc_goldprices1_lblOMSell b')
        .text()
        .trim();
      goldPrice.jewelrySellColor = this.util.priceColor(
        $('span#DetailPlace_uc_goldprices1_lblOMSell b font').attr('color'),
      );
      goldPrice.jewelryBuy = $('span#DetailPlace_uc_goldprices1_lblOMBuy b')
        .text()
        .trim();
      goldPrice.jewelryBuyColor = this.util.priceColor(
        $('span#DetailPlace_uc_goldprices1_lblOMBuy b font').attr('color'),
      );
      return goldPrice;
    } catch (error) {
      console.error(error);
    }
  };

  getGasPrice = async (provider: string): Promise<any> => {
    try {
      // Fetch HTML
      const { data }: any = await axios.get(
        'http://gasprice.kapook.com/gasprice.php',
      );
      // Load HTML
      const $: any = cheerio.load(data);
      // Select div items
      const gasPrice: any = [];
      // Select div items
      const providerName = $(
        `article.gasprice.${provider} > header > h3`,
      ).text();
      $(`article.gasprice.${provider} > ul > li`).each((i: any, elem: any) => {
        gasPrice.push({
          name: $(elem).find('span').text(),
          value: $(elem).find('em').text(),
        });
      });
      return {
        providerName: providerName,
        gasPrice: gasPrice,
      };
    } catch (error) {
      console.error(error);
    }
  };
}
