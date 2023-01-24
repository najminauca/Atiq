import {Body, Controller, Get, Param, Post} from "@nestjs/common";
import {CreateUserDto} from "./dto/create-user.dto";
import {AuthService} from "./auth.service";
import {FavoriteService} from "./favorite.service";
import {User} from "./user.entity";
import {Product} from "../product/product.entity";
import {FavProductDto} from "./dto/fav-product.dto";
import {FavSellerDto} from "./dto/fav-seller-dto";

@Controller('favorite')
export class FavoriteController {
    constructor(private favoriteService: FavoriteService) {}

    @Post('/addfavseller')
    async addFavoriteSeller(@Body() favDto: FavSellerDto): Promise<void> {
        return await this.favoriteService.addFavoriteSeller(favDto);
    }

    @Post('/delfavseller')
    async deleteFavoriteSeller(@Body() favDto: FavSellerDto): Promise<void> {
        return await this.favoriteService.deleteFavoriteSeller(favDto);
    }

    @Get('/isfavseller')
    async isFavoriteSeller(@Body() favDto: FavSellerDto): Promise<boolean> {
        return this.favoriteService.isFavoriteSeller(favDto);
    }


    @Post('/addfavproduct')
    async addFavoriteProduct(@Body() addFavProductDto: FavProductDto): Promise<void> {
        return this.favoriteService.addFavoriteProduct(addFavProductDto);
    }

    @Post('/delfavproduct')
    async deleteFavoriteProduct(@Body() delFavProductDto: FavProductDto): Promise<void> {
        return this.favoriteService.deleteFavoriteProduct(delFavProductDto);
    }

    @Get('/isfavproduct')
    async isFavoriteProduct(@Body() isFavProductDto: FavProductDto): Promise<boolean> {
        return this.favoriteService.isFavoriteProduct(isFavProductDto);
    }
}