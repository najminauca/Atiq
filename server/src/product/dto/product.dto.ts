import {UserDto} from "../../auth/dto/user.dto";

export class ProductDto {
    public id: string;

    public title: string;

    public description: string;

    public price: number;

    public priceStatus: boolean;

    public seller: UserDto;

    constructor(id: string, title: string, description: string, price: number, priceStatus: boolean, seller: UserDto) {
        this.id = id
        this.title = title
        this.description = description
        this.price = price
        this.priceStatus = priceStatus
        this.seller = seller
    }
}