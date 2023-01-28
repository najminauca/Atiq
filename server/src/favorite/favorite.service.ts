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

@Injectable()
export class FavoriteService {
    constructor(
        @InjectRepository(FavoriteSeller)
        private favoriteSeller: Repository<FavoriteSeller>,
        @InjectRepository(FavoriteProduct)
        private favoriteProduct: Repository<FavoriteProduct>,
    ) {
    }

    async addFavoriteSeller(seller: FavSellerDto, user: User): Promise<void> {
        const favoriteUser = this.favoriteSeller.create({
            user: user.id,
            seller: seller.seller
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
        await this.favoriteSeller.delete({
            user: user.id,
            seller: seller.seller
        });
    }

    async isFavoriteSeller(seller: FavSellerDto, user: User): Promise<boolean> {
        const isFavorite = await this.favoriteSeller.findOne({
            where: {
                user: user.id,
                seller: seller.seller
            }
        })

        return isFavorite != null
    }

    async addFavoriteProduct(product: FavProductDto, user: User): Promise<void> {
        const favoriteProduct = this.favoriteProduct.create({
            user: user.id,
            product: product.product
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
        await this.favoriteProduct.delete({
            user: user.id,
            product: product.product
        });
    }

    async isFavoriteProduct(product: FavProductDto, user: User): Promise<boolean> {
        const isFavorite = await this.favoriteProduct.findOne({
            where: {
                user: user.id,
                product: product.product
            }
        })

        return isFavorite != null
    }
}