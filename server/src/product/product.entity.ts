import {PriceStatus} from "./price-status.enum";
import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {IsEnum} from "class-validator";
import {ProductModule} from "./product.module";



@Entity()
export class Product{

   @PrimaryGeneratedColumn('uuid')
    id: string;

   @Column()
    title: string;

   @Column()
    description: string;


   @Column({ type: "decimal",precision:10, scale:2, default:0})
    price : number;

   @Column()
   @IsEnum(PriceStatus)
    priceStatus: PriceStatus;




}