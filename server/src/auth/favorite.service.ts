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
import {FavoriteUser} from "./favorite-user.entity";
import {Product} from "../product/product.entity";
import {FavoriteProduct} from "./favorite-product.entity";

@Injectable()
export class FavoriteService {
    constructor(
        @InjectRepository(User)
        private favoriteSeller: Repository<FavoriteUser>,
        @InjectRepository(User)
        private favoriteProduct: Repository<FavoriteProduct>,
    ) {}

    async addFavoriteSeller(user: User, seller: User): Promise<void> {

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

    async addFavoriteProduct(user: User, product: Product): Promise<void> {

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
}