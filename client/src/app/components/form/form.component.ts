import {Component, Input, OnInit} from '@angular/core';
import {lastValueFrom} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Input() title: string;
  @Input() description: string;
  @Input() price: number
  @Input() status: boolean;
  selectedPicture: string | ArrayBuffer | null;
  width = 200;
  height = 100;

  constructor(public http: HttpClient) {
    this.title = ""
    this.description = ""
    this.price = 0.0
    this.status = false
    this.selectedPicture = ""
  }

  ngOnInit(): void {
  }

  async onSubmit(title: string, description: string, price: number, status: boolean) {
    await lastValueFrom(this.http.post("http://localhost:3000/product/add", {
      title,
      description,
      price,
      status
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
