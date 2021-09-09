const cryptocurrenciesList = [
  {
    "symbol_th": "หมา",
    "symbol_eh": "doge"
  },
  {
    "symbol_th": "ยาย",
    "symbol_eh": "iost"
  }
]

export function mapSymbolsThai(symbols: string): string {
  const currency: string = cryptocurrenciesList
    .filter(
      (item: any) =>
        item.symbol_th === symbols
    ).map(
      (element: any) =>
        element.symbol_eh
    )[0] || symbols
  return currency
}

