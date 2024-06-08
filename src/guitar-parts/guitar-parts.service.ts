import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { GuitarParts } from './guitar-parts.model';
import { IGuitarPartsFilter, IGuitarPartsQuery } from './types';

@Injectable()
export class GuitarPartsService {
  constructor(
    @InjectModel(GuitarParts)
    private guitarPartsModel: typeof GuitarParts,
  ) {}

  async paginateAndFilter(
    query: IGuitarPartsQuery,
  ): Promise<{ count: number; rows: GuitarParts[] }> {
    const limit = +query.limit;
    const offset = +query.offset * 20;
    const filter = {} as Partial<IGuitarPartsFilter>;

    if (query.priceFrom && query.priceTo) {
      filter.price = {
        [Op.between]: [+query.priceFrom, +query.priceTo],
      };
    }

    if (query.guitar) {
      filter.guitar_manufacturer = JSON.parse(decodeURIComponent(query.guitar));
    }

    if (query.parts) {
      filter.parts_manufacturer = JSON.parse(decodeURIComponent(query.parts));
    }

    return this.guitarPartsModel.findAndCountAll({
      limit,
      offset,
      where: filter,
    });
  }

  async bestsellers(): Promise<{ count: number; rows: GuitarParts[] }> {
    return this.guitarPartsModel.findAndCountAll({
      where: { bestseller: true },
    });
  }

  async new(): Promise<{ count: number; rows: GuitarParts[] }> {
    return this.guitarPartsModel.findAndCountAll({
      where: { new: true },
    });
  }

  async findOne(id: number | string): Promise<GuitarParts> {
    return this.guitarPartsModel.findOne({
      where: { id },
    });
  }

  async findOneByName(name: string): Promise<GuitarParts> {
    return this.guitarPartsModel.findOne({
      where: { name },
    });
  }

  async searchByString(
    str: string,
  ): Promise<{ count: number; rows: GuitarParts[] }> {
    return this.guitarPartsModel.findAndCountAll({
      limit: 20,
      where: { name: { [Op.like]: `%${str}%` } },
    });
  }
}
