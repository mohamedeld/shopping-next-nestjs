import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private readonly prismaService: PrismaService) {}
  createProduct(body: CreateProductDto, userId: number) {
    return this.prismaService.product.create({
      data: {
        ...body,
        userId,
      },
    });
  }
}
