import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import {AuthModule} from "../auth/auth.module";
import {ProductListController} from "./product-list.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Product]), AuthModule],
  controllers: [ProductController, ProductListController],
  providers: [ProductService],
})
export class ProductModule {}
