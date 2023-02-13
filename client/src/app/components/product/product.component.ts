import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {Product} from "../../objects/Product";
import {lastValueFrom} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  productData: Product | undefined
  productId: string | null
  constructor(private activatedRoute: ActivatedRoute, public http: HttpClient, private router: Router) {
    this.productId = this.activatedRoute.snapshot.paramMap.get('productId')
    console.log(this.productId)
    const data: any = lastValueFrom(this.http.get("http://localhost:3000/product/${productId}"));
    this.productData = data
  }

  async ngOnInit(): Promise<void> {
  }
}
