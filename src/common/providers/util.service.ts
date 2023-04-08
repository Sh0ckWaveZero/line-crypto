import { Injectable } from '@nestjs/common';
type TemplateParameter = any[];

@Injectable()
export class UtilService {
  regex = new RegExp(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g);

  public template<T>(
    templateData: TemplateStringsArray,
    param: T[],
    delimiter = '\n',
  ): string {
    let output = '';
    for (let i = 0; i < param.length; i += 1) {
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      output += templateData[i] + param[i];
    }
    output += templateData[param.length];

    const lines: string[] = output.split(/(?:\r\n|\n|\r)/);

    return lines
      .map((text: string) => text.replace(/^\s+/gm, ''))
      .join(delimiter)
      .trim();
  }

  public pre(
    templateData: TemplateStringsArray,
    ...param: TemplateParameter
  ): string {
    return this.template(templateData, param, '\n');
  }

  public line(
    templateData: TemplateStringsArray,
    ...param: TemplateParameter
  ): string {
    return this.template(templateData, param, ' ');
  }

  public isKeyOfSchema<T extends object>(
    key: unknown,
    schema: T,
  ): key is keyof T {
    return typeof key === 'string' && key in schema;
  }

  public removeUndefined<T extends object>(argv: T): Record<string, unknown> {
    // https://stackoverflow.com/questions/25421233
    // JSON.parse(JSON.stringify(args));
    return Object.fromEntries(
      Object.entries(argv).filter(
        ([, value]: [string, unknown]) => value !== undefined,
      ),
    );
  }

  public isEmpty(obj: any): boolean {
    return (
      [Object, Array].includes((obj || {}).constructor) &&
      !Object.entries(obj || {}).length
    );
  }

  public compareDate = (dateA: string, dateB: string) => {
    const _date1 = new Date(dateA);
    const _date2 = new Date(dateB);
    return _date1.getTime() > _date2.getTime();
  };

  public expo(price: string, symbol: string) {
    const parsedPrice = Number(price);
    if (parsedPrice > 1) {
      return `${symbol} ${Number.parseFloat(price)
        .toFixed(3)
        .toString()
        .replace(this.regex, ',')}`;
    } else if (parsedPrice > 0.00001) {
      return this.customPriceFormat(price, 5, symbol);
    } else {
      return this.customPriceFormat(price, 3, symbol);
    }
  }

  public priceFormat(price: string, symbol: string) {
    return `${symbol} ${parseFloat(price).toString().replace(this.regex, ',')}`;
  }

  public customPriceFormat(price: string, digit: number, symbol: string) {
    return `${symbol} ${Number.parseFloat(price)
      .toExponential(digit)
      .toString()
      .replace(this.regex, ',')}`;
  }

  public volumeChangeFormat(price: string) {
    const parsedPrice = parseFloat(price);
    return `${parsedPrice > 0 ? '+' : ''}${parsedPrice
      .toFixed(2)
      .toString()
      .replace(this.regex, ',')}%`;
  }

  public lastUpdateFormat = (lastUpdate: string | number) => {
    lastUpdate = lastUpdate ? lastUpdate : new Date().toLocaleString();
    return new Date(lastUpdate).toLocaleString('th-TH', {
      timeZone: 'Asia/Bangkok',
      hour12: false,
    });
  };

  public priceChangeColor = (price: string) => {
    return Number(price) > 0 ? '#00D666' : '#F74C6C';
  };

  public priceColor = (name: string) => {
    return name === 'Green' ? '#00D666' : '#F74C6C';
  };

  public randomItems = (source: any[]) => {
    const url = source;
    const randomIndex = Math.floor(Math.random() * url.length - 1);
    return url[randomIndex];
  };

  public getGoldPricesColors = (element: any, goldBarPrices: any) => {
    const colors = [];
    const colorsClassName = {
      'g-d': '#E20303',
      'g-n': '#444',
      'g-u': '#0F8000',
    };

    goldBarPrices.each((i: any, el: any) => {
      const className = element(el).attr('class');
      if (className !== 'span bg-span al-l') {
        const currentColor = colorsClassName[className.split(' ')[2]];
        colors.push(currentColor);
      }
    });

    return colors;
  }
}
