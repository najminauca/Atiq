import {Body, Controller, Get, Post, Query} from '@nestjs/common';
import {ProductService} from "./product.service";
import {CreateProductDto} from "./dto/create-product.dto";
import {Product} from "./product.entity";
import {SearchProductDto} from "./dto/search-product.dto";

@Controller('product')
export class ProductController {


    constructor(
        private productService: ProductService
    ) {
    }



    @Post('/add')
    async createProduct(@Body()createProductDto: CreateProductDto){
        return this.productService.createProduct(createProductDto);
    }



    @Get('/all')
    async getProducts( @Query() searchProductDto : SearchProductDto): Promise<Product[]>{
        return this.productService.getProducts(searchProductDto);
    }


}
