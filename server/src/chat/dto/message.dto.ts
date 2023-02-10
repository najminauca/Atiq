import {Column} from "typeorm";
import {IsNotEmpty, IsString} from "class-validator";
import {ChatRoom} from "../chat-room.entity";

export class MessageDto {
    @IsString()
    @IsNotEmpty()
    receiverID: string

    @IsString()
    @IsNotEmpty()
    message: string
}