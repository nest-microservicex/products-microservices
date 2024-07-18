import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaClient } from '@prisma/client';
import { PaginationDto } from 'src/common';

@Injectable()
export class ProductsService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('product service');

  onModuleInit() {
    this.$connect();
    this.logger.log('db connected');
  }

  create(createProductDto: CreateProductDto) {
    return this.product.create({
      data: createProductDto,
    });
  }

  async findAll(pag: PaginationDto) {
    const { page, limit } = pag;
    const total = await this.product.count({ where: { avaiable: true } });
    return {
      content: await this.product.findMany({
        take: limit,
        skip: (page - 1) * limit,
        where: {
          avaiable: true,
        },
      }),
      data: {
        total,
        page,
      },
    };
  }

  findOne(id: number) {
    return this.product.findUnique({
      where: {
        id,
        avaiable: true,
      },
    });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const { id: __, ...data } = updateProductDto;
    await this.findOne(id);
    return this.product.update({
      where: { id },
      data: data,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return await this.product.update({
      where: { id },
      data: {
        avaiable: false,
      },
    });
  }
}
