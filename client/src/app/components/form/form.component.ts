import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  selectedPicture: string | ArrayBuffer;

  constructor() {
    this.selectedPicture = ""
  }

  ngOnInit(): void {
  }

  onSubmit() {

  }

  selectPicture(event: any) {
    /*
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      this.selectedPicture = reader.result;
    };

    reader.readAsDataURL(file);
    */
  }

}
