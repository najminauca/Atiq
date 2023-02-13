import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {Product} from "../../objects/Product";
import {lastValueFrom} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  productData: Product | undefined
  productId: string | null = ""
  constructor(private activatedRoute: ActivatedRoute, public http: HttpClient, private router: Router) {
    this.getProductData()
  }

  async ngOnInit(): Promise<void> {
  }

  async getProductData(): Promise<void> {
    this.productId = this.activatedRoute.snapshot.paramMap.get('productId')
    try {
      const data: any = await lastValueFrom(this.http.get("http://localhost:3000/product/" + this.productId));
      this.productData = data
    } catch(e) {
      console.log(e)
    }
  }
}
