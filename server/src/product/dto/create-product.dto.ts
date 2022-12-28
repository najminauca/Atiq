import {PriceStatus} from "../price-status.enum";


export class CreateProductDto{

    title: string;

    description: string;

    price: number;

    priceStatus: PriceStatus;


}