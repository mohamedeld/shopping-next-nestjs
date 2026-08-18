import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Product } from 'generated/prisma/client';

@Injectable()
export class ProductsService {
  constructor(private readonly prismaService: PrismaService) {}
  async createProduct(
    body: CreateProductDto,
    userId: number,
  ): Promise<Product> {
    const product = await this.prismaService.product.create({
      data: {
        ...body,
        userId,
      },
    });
    return product;
  }
  async getProducts() {
    return await this.prismaService.product.findMany();
  }
}
