import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './product.entity';
import { SearchProductDto } from './dto/search-product.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/role.enum';
import { RolesGuard } from '../auth/roles.guard';
import { PassportModule } from '@nestjs/passport';

@Controller('product')
@UseGuards(AuthGuard())
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post('/add')
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  async createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productService.createProduct(createProductDto);
  }

  @Get('/all')
  async getProducts(
    @Query() searchProductDto: SearchProductDto,
  ): Promise<Product[]> {
    return this.productService.getProducts(searchProductDto);
  }

  @Delete('/delete')
  async deleteProduct(@Param('id') id: string): Promise<void> {
    return this.productService.deleteProduct(id);
  }

  @Get('/product')
  async productById(@Param('id') id: string): Promise<Product> {
    return this.productById(id);
  }
}
