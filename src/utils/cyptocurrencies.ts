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

