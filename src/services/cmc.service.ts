import { CmcList } from "../interfaces/cmc.interface";
import { CmcRepo } from "../repo/cmc";

export class CmcService {
  repo: CmcRepo;
  constructor() {
    this.repo = new CmcRepo();
  }

  async findOneCoinName(symbol: string) {
    return await this.repo.findBySymbol(symbol).then((coin: CmcList) => {
      return coin.name;
    });
  }

  async findOneCoinId(symbol: string) {
    return await this.repo.findBySymbol(symbol).then((coin: CmcList) => {
      return coin.id;
    });
  }

  async addCoinsList(items: any[]) {
    return await this.repo.addMany(items?.map((item: CmcList) => {
      return {
        id: item?.id,
        name: item?.name,
        symbol: item?.symbol,
        slug: item?.slug,
        updated_at: new Date(),
        created_at: new Date(),
      };
    }));
  }
}
