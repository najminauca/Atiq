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

  constructor(public http: HttpClient, public productService: ProductService) {
    this.searchInput = "";
    this.searchResults = [];
    this.searchClicked = false;
    this.heartClicked = false;
    this.updateProducts()
    console.log(productService.productList.length);
    console.log(this.productService.havenoidea);
  }

  ngOnInit(): void {
  }

  async updateProducts() {
    await this.productService.getProducts()
  }

  onSearch() {
    this.searchClicked = true;
  }

  async onStopSearch() {
    this.searchClicked = false;
  }

  onLike() {
    this.heartClicked = !this.heartClicked;
  }

}
