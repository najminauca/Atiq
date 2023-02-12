import {Injectable} from '@nestjs/common';
import {Repository} from 'typeorm';
import {Product} from './product.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {CreateProductDto} from './dto/create-product.dto';
import {SearchProductDto} from './dto/search-product.dto';
import {User} from '../auth/user.entity';
import {ProductDto} from "./dto/product.dto";
import {ProductListDto} from "./dto/product-list.dto";
import {UserDto} from "../auth/dto/user.dto";

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(User)
    private userRepository: Repository<User>
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

  async getProducts(
    searchProductDto: SearchProductDto,
  ): Promise<ProductListDto> {
    const { search } = searchProductDto;

    const query = this.productRepository.createQueryBuilder('product');

    if (search) {
      // query.andWhere('product.title LIKE :search ', {search : `%${search}%`});
      query.andWhere('product.title = :search', { search });
    }

    const products: Product[] = await query.getMany();
    const sellerFromRepo = await this.userRepository.find();
    const seller = sellerFromRepo.at(0);

    const sendProducts: ProductDto[] = products.map((product: Product) => {
          return new ProductDto(
              product.id,
              product.title,
              product.description,
              product.price,
              product.priceStatus,
              new UserDto(
                  seller.id,
                  seller.username,
                  seller.firstname,
                  seller.lastname,
                  seller.role
              )
          );
        }
    )

    return new ProductListDto(sendProducts);
  }

  async deleteProduct(id: SearchProductDto, seller: User): Promise<void> {
    await this.productRepository.delete({
      id: id.search,
      seller: seller,
    });
  }

  async productById(id: SearchProductDto): Promise<ProductDto> {
    const product = await this.productRepository.findOne({
      where: {
        id: id.search,
      },
    });
    const sellerFromRepo = await this.userRepository.find();
    const seller = sellerFromRepo.at(0);

    return new ProductDto(
        product.id,
        product.title,
        product.description,
        product.price,
        product.priceStatus,
        new UserDto(
            seller.id,
            seller.username,
            seller.firstname,
            seller.lastname,
            seller.role
        )
    )
  }
}
