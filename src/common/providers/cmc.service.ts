import { Injectable } from '@nestjs/common';
import { CmcList } from '../interface';
import { CmcRepository } from '../repository/cmc.repository';

@Injectable()
export class CmcService {
  constructor(private readonly repo: CmcRepository) {}

  async findOne(symbol: string) {
    return await this.repo.findBySymbol(symbol);
  }

  async addCoinsList(items: any[]): Promise<any> {
    return await this.repo.addMany(
      items?.map((item: CmcList) => {
        return {
          id: item?.id,
          name: item?.name,
          symbol: item?.symbol,
          slug: item?.slug,
          updated_at: new Date(),
          created_at: new Date(),
        };
      }),
    );
  }
}
