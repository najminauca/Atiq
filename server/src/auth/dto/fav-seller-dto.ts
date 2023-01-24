import { IsNotEmpty, IsString } from 'class-validator';


export class FavSellerDto {

    @IsString()
    @IsNotEmpty()
    user: string;

    @IsString()
    @IsNotEmpty()
    seller: string;
}