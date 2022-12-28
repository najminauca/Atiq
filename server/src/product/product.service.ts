import { Injectable } from '@nestjs/common';
import {Repository} from "typeorm";
import {Product} from "./product.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {CreateProductDto} from "./dto/create-product.dto";
import {SearchProductDto} from "./dto/search-product.dto";

@Injectable()
export class ProductService {


    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>) {
    }



    async getProducts( searchProductDto: SearchProductDto): Promise<Product[]>{

           const { search } = searchProductDto;

        const query = this.productRepository.createQueryBuilder('product');

        if (search){
            // query.andWhere('product.title LIKE :search ', {search : `%${search}%`});
            query.andWhere('product.title = :search' , {search});
        }

        const products = await query.getMany();

        return products;



    }







    async createProduct( createProductDto: CreateProductDto):Promise<void>{

        const { title, description, price, priceStatus } = createProductDto;

        const product = this.productRepository.create({
            title,
            description,
            price,
            priceStatus,
        });


             await this.productRepository.save(product);
    }




}
