import {Body, Controller, Get, Param, Post} from "@nestjs/common";
import {CreateUserDto} from "./dto/create-user.dto";
import {AuthService} from "./auth.service";
import {FavoriteService} from "./favorite.service";
import {User} from "./user.entity";
import {Product} from "../product/product.entity";

@Controller('favorite')
export class FavoriteController {
    constructor(private favoriteService: FavoriteService) {}

    @Post('/favseller')
    async addFavoriteSeller(@Param('user') user: User, @Param('seller') seller: User): Promise<void> {
        return await this.favoriteService.addFavoriteSeller(user, seller);
    }

    @Get('/isfavseller')
    async isFavoriteSeller(@Param('user') user: User, @Param('seller') seller: User): Promise<boolean> {
        return this.favoriteService.isFavoriteSeller(user, seller);
    }


    @Post('/favproduct')
    async addFavoriteProduct(@Param('user') user: User, @Param('product') product: Product): Promise<void> {
        return this.favoriteService.addFavoriteProduct(user, product);
    }

    @Get('/isfavproduct')
    async isFavoriteProduct(@Param('user') user: User, @Param('product') product: Product): Promise<boolean> {
        return this.favoriteService.isFavoriteProduct(user, product);
    }
}