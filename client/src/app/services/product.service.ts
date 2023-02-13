import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {lastValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productList:any[] = [];
  havenoidea: any;

  constructor(private http: HttpClient) {
    this.getProducts();
  }

 async getProducts(){
    const product: any = await lastValueFrom(this.http.get('http://localhost:3000/productlist/all'));
    this.productList = product.productList;
    console.log(this.productList[1]);

  }


}
