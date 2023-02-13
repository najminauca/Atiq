import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../objects/Product";
import {lastValueFrom} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @Input() searchInput: string;
  @Input() searchResults: string[];
  @Input() searchClicked: boolean;
  @Input() heartClicked: boolean;

  //public productList: Product[] = [];


  constructor(public http: HttpClient, public productService: ProductService) {
    this.searchInput = "";
    this.searchResults = [];
    this.searchClicked = false;
    this.heartClicked = false;
    console.log(productService.productList.length);
    console.log(this.productService.havenoidea);
  //  this.getProductList()
   // this.productList = this.productService.productList;
  //  this.productService.getProducts();
  //  this.fetchProducts();

  }

  ngOnInit(): void {


    // this.productService.getProducts();

    // this.productList = this.productService.productList;
  }

<<<<<<< HEAD
  // fetchProducts(){
  //   this.productService.getProducts();
  // }

  // async getProductList(): Promise<void> {
  //   const data: any = await lastValueFrom(this.http.get("http://localhost:3000/productlist/all"));
  //   this.productList = data.productList;
  // }
=======
  async getProductList(): Promise<void> {
    const data: any = await lastValueFrom(this.http.get("http://localhost:3000/product/all"));
    this.productList = data.productList;
  }
>>>>>>> 93279d0907ca9b02c5ab8476bcd78a1895c599b8

  onSearch() {
    //this.searchResults = this.items.filter(item => item.toLowerCase().includes(this.searchInput.toLowerCase()));
    this.searchClicked = true;
  }

  async onStopSearch() {
    this.searchClicked = false;
  }

  onLike() {
    this.heartClicked = !this.heartClicked;
  }

}
