import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {FavoriteController} from "./favorite.controller";
import {FavoriteService} from "./favorite.service";
import {FavoriteProduct} from "./favorite-product.entity";
import {FavoriteSeller} from "./favorite-seller.entity";
import {AuthModule} from "./auth.module";

@Module({
    imports: [TypeOrmModule.forFeature([FavoriteSeller, FavoriteProduct]), AuthModule],
    controllers: [FavoriteController],
    providers: [FavoriteService],
})
export class FavoriteModule {}
