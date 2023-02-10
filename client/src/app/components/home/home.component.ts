import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @Input() searchInput: string;
  @Input() searchResults: string[];
  items = ['apple', 'orange', 'banana', 'ballon', 'kiwi', 'laptop', 'jacke','popo'];
  @Input() searchClicked: boolean;
  @Input() heartClicked: boolean;

  constructor() {
    this.searchInput = "";
    this.searchResults = [];
    this.searchClicked = false;
    this.heartClicked = false;
  }

  ngOnInit(): void {
  }

  onSearch() {
    this.searchResults = this.items.filter(item => item.toLowerCase().includes(this.searchInput.toLowerCase()));
    this.searchClicked = true;
  }

  async onStopSearch() {
    this.searchClicked = false;
  }

  onLike() {
    this.heartClicked = !this.heartClicked;
  }

}
