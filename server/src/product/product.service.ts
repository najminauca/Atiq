import {Injectable} from '@nestjs/common';
import {Repository} from 'typeorm';
import {Product} from './product.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {CreateProductDto} from './dto/create-product.dto';
import {SearchProductDto} from './dto/search-product.dto';
import {User} from '../auth/user.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async createProduct(
    createProductDto: CreateProductDto,
    seller: User,
  ): Promise<void> {
    const { title, description, price, priceStatus } = createProductDto;

    const product = this.productRepository.create({
      title: title,
      description: description,
      price: price,
      priceStatus: priceStatus,
      seller: seller,
    });

    await this.productRepository.save(product);
  }

  async getProducts(searchProductDto: SearchProductDto): Promise<Product[]> {
    const { search } = searchProductDto;

    const query = this.productRepository.createQueryBuilder('product');

    if (search) {
      // query.andWhere('product.title LIKE :search ', {search : `%${search}%`});
      query.andWhere('product.title = :search', { search });
    }

    const products = await query.getMany();

    return products;
  }

  async deleteProduct(id: SearchProductDto, seller: User): Promise<void> {
    await this.productRepository.delete({
      id: id.search,
      seller: seller,
    });
  }

  async productById(id: SearchProductDto): Promise<Product> {
    return await this.productRepository.findOne({
      where: {
        id: id.search,
      },
    });
  }
}
