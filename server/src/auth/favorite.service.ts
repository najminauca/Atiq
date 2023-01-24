import {
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

import * as bycrpt from 'bcrypt';
import { Payload } from './payload.interface';
import { JwtService } from '@nestjs/jwt';
import {CreateUserDto} from "./dto/create-user.dto";
import {FavoriteSeller} from "./favorite-seller.entity";
import {Product} from "../product/product.entity";
import {FavoriteProduct} from "./favorite-product.entity";
import {GetUser} from "./get-user.decorator";
import {FavProductDto} from "./dto/fav-product.dto";
import {FavSellerDto} from "./dto/fav-seller-dto";

@Injectable()
export class FavoriteService {
    constructor(
        @InjectRepository(FavoriteSeller)
        private favoriteSeller: Repository<FavoriteSeller>,
        @InjectRepository(FavoriteProduct)
        private favoriteProduct: Repository<FavoriteProduct>,
        /*@GetUser()
        private user: User*/
    ) {
    }

    async addFavoriteSeller(favDto: FavSellerDto): Promise<void> {
        const {user, seller} = favDto
        const favoriteUser = this.favoriteSeller.create({
            user: user,
            seller: seller
        });
        try {
            await this.favoriteSeller.save(favoriteUser);
        } catch (e) {
            throw new InternalServerErrorException(
                'server error',
            );
        }
    }
    async deleteFavoriteSeller(favDto: FavSellerDto): Promise<void> {
        const {user, seller} = favDto
        await this.favoriteSeller.delete({
            user: user,
            seller: seller
        });
    }

    async isFavoriteSeller(favDto: FavSellerDto): Promise<boolean> {
        const {user, seller} = favDto
        const isFavorite = await this.favoriteSeller.findOne({
            where: {
                user: user,
                seller: seller
            }
        })

        return isFavorite != null
    }

    async addFavoriteProduct(addFavProductDto: FavProductDto): Promise<void> {

        const {user, product} = addFavProductDto
        const favoriteProduct = this.favoriteProduct.create({
            user: user,
            product: product
        });
        try {
            await this.favoriteProduct.save(favoriteProduct);
        } catch (e) {
            throw new InternalServerErrorException(
                'server error',
            );
        }
    }

    async deleteFavoriteProduct(delFavProductDto: FavProductDto): Promise<void> {
        const {user, product} = delFavProductDto
        await this.favoriteProduct.delete({
            user: user,
            product: product
        });
    }

    async isFavoriteProduct(isFavProductDto: FavProductDto): Promise<boolean> {
        const {user, product} = isFavProductDto
        const isFavorite = await this.favoriteProduct.findOne({
            where: {
                user: user,
                product: product
            }
        })

        return isFavorite != null
    }
}