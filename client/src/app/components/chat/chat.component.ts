import { Component, OnInit } from '@angular/core';
import { io } from 'socket.io-client';
import {ChatRoom} from "../../objects/ChatRoom";
import {Message} from "../../objects/Message";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {lastValueFrom} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  messages : string[] = [];
  newMessage: string;
  users = ['Hicham', 'Najmi', 'Yohanes', 'Sarah'];
  rooms: ChatRoom[] = []
  shownMessages: Message[] = []
  selectedUser: string;
  selectedUserButton = false;

  socket = io('http//localhost:3000')

  constructor(activatedRoute: ActivatedRoute, public authService: AuthService, public http: HttpClient) {
    this.newMessage = "";
    this.selectedUser = this.users[0];
    this.getAllChatroom()
  }

  ngOnInit(): void {
    this.socket.on('message', (message) => {
      //TODO: Refresh chat room messages (HTML)
    })
  }

  sendMessage() {
    this.socket.emit('sendMessage', {}, () => {})
    this.messages.push(this.newMessage);
    this.newMessage = '';
  }

  async getAllChatroom() {
    console.log(this.authService.getId())
    const data: any = await lastValueFrom(this.http.get('http://localhost:3000/chat/getAllChatroom/' + this.authService.getId()));
    this.rooms = data
  }

  getAllMessages(id: string) {
    this.socket.emit('getAllMessage', { id: id }, (response: Message[]) => {
      this.shownMessages = response
    })
  }

  openRoom(sellerId: string) {
    this.socket.emit('openRoom', { buyerId: localStorage.getItem('id'), sellerId: sellerId }, (room: ChatRoom) => {
      this.getAllChatroom() //Update room list
    })
  }

  switchChat(user: string) {
    this.selectedUser = user;
  }

  toggleHighlight() {
    this.selectedUserButton = !this.selectedUserButton;
  }
}
