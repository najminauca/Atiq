import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  messages : string[] = [];
  newMessage: string;
  users = ['Hicham', 'Najmi', 'Yohanes', 'Sarah'];
  selectedUser: string;
  selectedUserButton = false;

  constructor() {
    this.newMessage = "";
    this.selectedUser = this.users[0];
  }

  ngOnInit(): void {
  }

  sendMessage() {
    this.messages.push(this.newMessage);
    this.newMessage = '';
  }

  switchChat(user: string) {
    this.selectedUser = user;
  }

  toggleHighlight() {
    this.selectedUserButton = !this.selectedUserButton;
  }
}
