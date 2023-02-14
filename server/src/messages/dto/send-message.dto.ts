import {Column} from "typeorm";
import {IsNotEmpty, IsString} from "class-validator";
import {User} from "../../auth/user.entity";
import {UserDto} from "../../auth/dto/user.dto";

export class SendMessageDto {
    sender: string

    message: string

    constructor(sender: string, message: string) {
        this.sender = sender;
        this.message = message
    }
}