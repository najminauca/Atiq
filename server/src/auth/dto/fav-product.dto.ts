import { IsNotEmpty, IsString } from 'class-validator';


export class FavProductDto {

    @IsString()
    @IsNotEmpty()
    user: string;

    @IsString()
    @IsNotEmpty()
    product: string;
}