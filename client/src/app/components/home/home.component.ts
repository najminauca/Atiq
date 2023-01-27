import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @Input() searchInput: string;
  @Input() searchResults: string[];
  items = ['apple', 'orange', 'banana', 'ballon', 'kiwi', 'laptop', 'jacke','popo']

  constructor() {
    this.searchInput = "";
    this.searchResults = [];
  }

  ngOnInit(): void {
  }

  onSearch() {
    this.searchResults = this.items.filter(item => item.toLowerCase().includes(this.searchInput.toLowerCase()));
  }

}
