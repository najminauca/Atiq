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
  selectedRoom: ChatRoom | undefined;
  shownMessages: Message[] = []
  selectedUser: string;
  selectedUserButton = false;

  socket = io('http://localhost:3000')

  constructor(public activatedRoute: ActivatedRoute, public authService: AuthService, public http: HttpClient) {
    this.newMessage = "";
    this.selectedUser = this.users[0];
    this.getAllChatroom()
    this.getAllMessages()
  }

  ngOnInit(): void {
    this.getAllMessages()

    this.socket.on('message', (message) => {
      console.log("update message list")
      this.getAllMessages()
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
    const room = localStorage.getItem('currentRoom')
    if(room != null) {
      this.selectedRoom = this.rooms.find((it) => it.id == room)
    } else {
      this.selectedRoom = this.rooms[0]
    }
  }

  onSelect(room: ChatRoom) {
    this.selectedRoom = room
    localStorage.setItem('currentRoom', this.selectedRoom.id)
    this.getAllMessages();
    this.getAllMessages()
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
