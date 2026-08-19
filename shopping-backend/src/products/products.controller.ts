import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth-gurad';
import { CreateProductDto } from './dto/create-product.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { TokenPayload } from 'src/auth/token-payload.interface';
import { ProductsService } from './products.service';
import { Product } from 'generated/prisma/client';
@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Post('create')
  @UseGuards(JwtAuthGuard)
  async createProduct(
    @Body() body: CreateProductDto,
    @CurrentUser() user: TokenPayload,
  ): Promise<Product> {
    return await this.productService.createProduct(body, user?.userId);
  }

  @Post('/:id/image')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const originalName = file.originalname.replace(/\s+/g, '-');
          const filename = `${uniqueSuffix}-${originalName}`;
          cb(null, filename);
        },
      }),
    }),
  )
  uploadProductImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 500000 }),
          new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Param() id: string,
    @CurrentUser() user: TokenPayload,
  ) {}

  @Get('all')
  @UseGuards(JwtAuthGuard)
  async getProducts(): Promise<Product[]> {
    return await this.productService.getProducts();
  }
}
