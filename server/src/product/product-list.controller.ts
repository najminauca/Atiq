import {Body, Controller, Get, Query} from '@nestjs/common';
import {SearchProductDto} from "./dto/search-product.dto";
import {Product} from "./product.entity";
import {ProductService} from "./product.service";

@Controller('productlist')
export class ProductListController {
    constructor(private productService: ProductService) {}

    @Get('/all')
    async getProducts(
        @Query() searchProductDto: SearchProductDto,
    ): Promise<Product[]> {
        return this.productService.getProducts(searchProductDto);
    }

    @Get('/id')
    async productById(@Body() id: SearchProductDto): Promise<Product> {
        return this.productService.productById(id);
    }
}
