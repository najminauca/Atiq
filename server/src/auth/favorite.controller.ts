import {Body, Controller, Param, Post} from "@nestjs/common";
import {CreateUserDto} from "./dto/create-user.dto";
import {AuthService} from "./auth.service";
import {FavoriteService} from "./favorite.service";
import {User} from "./user.entity";
import {Product} from "../product/product.entity";

@Controller('favorite')
export class FavoriteController {
    constructor(private favoriteService: FavoriteService) {}

    @Post('/favseller')
    signUp(@Param('user') user: User, @Param('seller') seller: User): Promise<void> {
        return this.favoriteService.addFavoriteSeller(user, seller);
    }

    @Post('/favproduct')
    async addFavoriteProduct(@Param('user') user: User, @Param('product') product: Product) {
        return this.favoriteService.addFavoriteProduct(user, product)
    }
}