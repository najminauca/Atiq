import {Component, Input, OnInit} from '@angular/core';
import {lastValueFrom} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, provideRouter} from "@angular/router";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  public title: string = "";
  public description: string = "";
  public price: number = 0;
  public status: boolean = false;
  public selectedPicture: string | ArrayBuffer | null;
  width = 200;
  height = 100;
  home: any

  constructor(public http: HttpClient,) {
    this.selectedPicture = ""
  }

  ngOnInit(): void {
  }

  async onSubmit() {
    await lastValueFrom(this.http.post("http://localhost:3000/product/add", {
      title: this.title,
      description: this.description,
      price: this.price,
      status: this.status
    }));
  }

  setPriceStatus(bool: boolean) {
    this.status = bool
  }

  selectPicture(event: any) {

    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      this.selectedPicture = reader.result;
    };

    reader.readAsDataURL(file);

  }

}
