const regex = new RegExp(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g);
export class Utils {
  isEmptyObject = (obj: object): boolean => {
    return !Object.keys(obj).length;
  };

  expo = (price: string, symbol: string) => {
    const _price = Number(price);
    if (_price > 1) {
      return symbol + " " + Number.parseFloat(price).toFixed(3).toString()
        .replace(regex, ",");
    } else if (_price > 0.00001) {
      return this.customPriceFormat(price, 5, symbol);
    } else {
      return this.customPriceFormat(price, 3, symbol);
    }
  }

  pirceFormat = (price: string, symbol: string) => {
    return symbol + " " + parseFloat(price).toString()
      .replace(regex, ",")
  }

  customPriceFormat = (price: string, digit: number, symbol: string) => {
    return symbol + " " +
      Number.parseFloat(price)
        .toExponential(digit).toString()
        .replace(regex, ",");
  }

  volumeChangeFormat = (price: string) => {
    return (Number(price) > 0 ? "+" : "") +
      parseFloat(price).toFixed(2).toString()
        .replace(regex, ",") + "%"
  }

  lastUpdateFormat = (lastUpdate: string | number) => {
    lastUpdate = lastUpdate ? lastUpdate : new Date().toLocaleString();
    return new Date(lastUpdate).toLocaleString("th-TH", {
      timeZone: "Asia/Bangkok",
      hour12: false,
    });
  }

  priceChangeColor = (price: string) => {
    return Number(price) > 0 ? "#00D666" : "#F74C6C";
  }

  priceColor = (name: string) => {
    return name === 'Green' ? "#00D666" : "#F74C6C";
  }

  compareDate = (date1: string, date2: string) => {
    const _date1 = new Date(date1);
    const _date2 = new Date(date2);
    return _date1.getTime() > _date2.getTime();
  }
}
