import { IsNotEmpty, IsString } from 'class-validator';


export class FavSellerDto {
    @IsString()
    @IsNotEmpty()
    seller: string;
}