import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth-gurad';
import { CreateProductDto } from './dto/create-product.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { TokenPayload } from 'src/auth/token-payload.interface';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Post('create')
  @UseGuards(JwtAuthGuard)
  async createProduct(
    @Body() body: CreateProductDto,
    @CurrentUser() user: TokenPayload,
  ) {
    return this.productService.createProduct(body, user?.userId);
  }
}
