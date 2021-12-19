import axios from "axios"
import { getCurrencyList } from "./cryptoList"

const cryptoCurrenciesList = [
  {
    "symbol_th": "หมา",
    "symbol_en": "doge"
  },
  {
    "symbol_th": "ยาย",
    "symbol_en": "iost"
  }
]

export function mapSymbolsThai(symbols: string): string {
  const currency: string = cryptoCurrenciesList
    .filter(
      (item: any) =>
        item.symbol_th === symbols
    ).map(
      (element: any) =>
        element.symbol_en
    )[0] || symbols
  return currency
}

export async function getCurrencyLogo(currencyName: string): Promise<any> {
  try {
    const kubImage = 'https://s2.coinmarketcap.com/static/img/exchanges/64x64/436.png'
    const currencyId: string = getCurrencyList()
      .filter((item: any) => item.name === currencyName.toLocaleUpperCase())
      .map((element: any) => element.id)[0]
    const cmcCurrenciesLogo = `https://s2.coinmarketcap.com/static/img/coins/128x128/${currencyId}.png`
    let response: any
    if (!currencyId) {
      response = await axios.get(
        `https://lcw.nyc3.cdn.digitaloceanspaces.com/production/currencies/64/${currencyName}.webp`
      );
    }
    return currencyId ? cmcCurrenciesLogo : (currencyName.toLocaleUpperCase() === 'KUB' ? kubImage : response.config.url)
  } catch (error) {
    return 'https://cryptoicon-api.vercel.app/api/icon/notfound'
  }
}

