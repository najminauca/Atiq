import {
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../auth/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

import {FavoriteSeller} from "./favorite-seller.entity";
import {FavoriteProduct} from "./favorite-product.entity";
import {FavProductDto} from "./dto/fav-product.dto";
import {FavSellerDto} from "./dto/fav-seller.dto";
import {Product} from "../product/product.entity";
import {ProductDto} from "../product/dto/product.dto";
import {UserDto} from "../auth/dto/user.dto";

@Injectable()
export class FavoriteService {
    constructor(
        @InjectRepository(FavoriteSeller)
        private favoriteSeller: Repository<FavoriteSeller>,
        @InjectRepository(FavoriteProduct)
        private favoriteProduct: Repository<FavoriteProduct>,
        @InjectRepository(User)
        private userRepo: Repository<User>,
        @InjectRepository(Product)
        private productRepo: Repository<Product>
    ) {
    }

    async addFavoriteSeller(seller: FavSellerDto, user: User): Promise<void> {
        const favSeller = await this.userRepo.findOne({
            where: {
                id: seller.id
            }
        })
        const favoriteUser = this.favoriteSeller.create({
            user: user,
            seller: favSeller
        });
        try {
            await this.favoriteSeller.save(favoriteUser);
        } catch (e) {
            throw new InternalServerErrorException(
                'server error',
            );
        }
    }
    async deleteFavoriteSeller(seller: FavSellerDto, user: User): Promise<void> {
        const getSeller = await this.userRepo.findOne({
            where: {
                id: seller.id
            }
        })
        await this.favoriteSeller.delete({
            user: user,
            seller: getSeller
        })
    }

    async isFavoriteSeller(id: string, user: User): Promise<boolean> {
        const favSeller = await this.userRepo.findOne({
            where: {
                id: id
            }
        })
        const isFavorite = await this.favoriteSeller.findOne({
            where: {
                user: user,
                seller: favSeller
            }
        })

        return isFavorite != null
    }

    async addFavoriteProduct(product: FavProductDto, user: User): Promise<void> {
        const favProduct = await this.productRepo.findOne({
            where: {
                id: product.id
            }
        })
        const favoriteProduct = this.favoriteProduct.create({
            user: user,
            product: favProduct
        });
        try {
            await this.favoriteProduct.save(favoriteProduct);
        } catch (e) {
            throw new InternalServerErrorException(
                'server error',
            );
        }
    }

    async deleteFavoriteProduct(product: FavProductDto, user: User): Promise<void> {
        const favProduct = await this.productRepo.findOne({
            where: {
                id: product.id
            }
        })
        await this.favoriteProduct.delete({
            user: user,
            product: favProduct
        });
    }

    async isFavoriteProduct(id: string, user: User): Promise<boolean> {
        const favProduct = await this.productRepo.findOne({
            where: {
                id: id
            }
        })
        const isFavorite = await this.favoriteProduct.findOne({
            where: {
                user: user,
                product: favProduct
            }
        })

        return isFavorite != null
    }
}