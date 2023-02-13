import {Component, Input, OnInit} from '@angular/core';
import {lastValueFrom} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  public isProductLiked?: boolean
  @Input() product: any;
  constructor(private http: HttpClient, public authService: AuthService) {}

  ngOnInit(): void {
    console.log(this.product)
    if(this.authService.isLoggedIn) {
      this.updateProductBool()
    }
  }

  async onLike() {
    if(this.isProductLiked) {
      await lastValueFrom(this.http.delete('http://localhost:3000/favorite/delfavproduct', {
        body: {
          id: this.product.id
        }
      }));
    } else {
      await lastValueFrom(this.http.post('http://localhost:3000/favorite/addfavproduct',
        {
          id: this.product.id
        }));
    }
    await this.updateProductBool()
  }

  async updateProductBool() {
    try {
      const bool: any = await lastValueFrom(this.http.get('http://localhost:3000/favorite/isfavproduct/' + this.product.id));
      this.isProductLiked = bool
    } catch(e) {
      console.log(e)
    }
    console.log(this.isProductLiked)
  }
}
