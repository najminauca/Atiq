import {IsNotEmpty, IsString} from "class-validator";

export class CreateMessageDto {
    @IsString()
    @IsNotEmpty()
    room: string

    @IsString()
    @IsNotEmpty()
    message: string

    constructor(room: string, message: string) {
        this.room = room;
        this.message = message
    }
}
