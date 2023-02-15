import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {Product} from "../../objects/Product";
import {lastValueFrom} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";

import { NgIf } from '@angular/common';
import { NgbCarouselConfig, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import {Picture} from "../../objects/picture";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  productData: Product | undefined;
  productId: string | null = "";

  imageUrl: Array<SafeUrl | undefined> = []

  constructor(private activatedRoute: ActivatedRoute, public http: HttpClient, private router: Router,config: NgbCarouselConfig, private sanitizer: DomSanitizer) {
    config.interval = 10000;
    config.wrap = false;
    config.keyboard = false;
    config.pauseOnHover = false;
    this.getProductData()
    this.getPic()
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

  async getPic(){
   const data: any = await lastValueFrom(this.http.get("http://localhost:3000/picture/get-pictures/"+ this.productId));
   const imagePath: Picture[] = data;

    imagePath.map(async (pic: Picture) => {
      this.http.get("http://localhost:3000/picture/get-image/" + pic.picture, {
        responseType: 'blob'
      }).subscribe(data =>{
        console.log(data);
        const unsafeImageUrl = URL.createObjectURL(data);
        this.imageUrl.push(this.sanitizer.bypassSecurityTrustUrl(unsafeImageUrl));
      });
    })
  }
}
