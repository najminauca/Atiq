import { Component, OnInit } from '@angular/core';
import { io } from 'socket.io-client';
import {ChatRoom} from "../../objects/ChatRoom";
import {Message} from "../../objects/Message";
import {ActivatedRoute, Router} from "@angular/router";
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
  selectedRoom: ChatRoom | undefined;
  shownMessages: Message[] = []
  selectedUser: string;
  selectedUserButton = false;

  socket = io('http://localhost:3000')

  constructor(public route: Router, public authService: AuthService, public http: HttpClient) {
    if(!authService.isLoggedIn()) {
      route.navigateByUrl('/login')
    }
    this.newMessage = "";
    this.selectedUser = this.users[0];
    this.getAllChatroom()
  }

  ngOnInit(): void {
    this.socket.on('message', (message) => {
      this.getAllChatroom()
    })
  }

  sendMessage() {
    const user = this.selectedRoom?.buyer.id == this.authService.getId() ? this.selectedRoom?.buyer : this.selectedRoom?.seller
    this.socket.emit('sendMessage', { room: this.selectedRoom?.id, sender: user?.id, message: this.newMessage}, () => {})
    this.newMessage = '';
  }

  async getAllChatroom() {
    console.log(this.authService.getId())
    const data: any = await lastValueFrom(this.http.get('http://localhost:3000/chat/getAllChatroom/'));
    this.rooms = data
    const room = sessionStorage.getItem('currentRoom')
    if(room != null) {
      this.selectedRoom = this.rooms.find((it) => it.id == room)
    } else {
      this.selectedRoom = this.rooms[0]
    }
    this.getAllMessages()
  }

  onSelect(room: ChatRoom) {
    this.selectedRoom = room
    sessionStorage.setItem('currentRoom', this.selectedRoom.id)
    this.getAllMessages();
  }

  async getAllMessages() {
    const data: any = await lastValueFrom(this.http.get('http://localhost:3000/chat/getAllMessage/' + this.selectedRoom?.id));
    this.shownMessages = data
  }

  switchChat(user: string) {
    this.selectedUser = user;
  }

  toggleHighlight() {
    this.selectedUserButton = !this.selectedUserButton;
  }
}
