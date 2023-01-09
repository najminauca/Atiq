import { PassportStrategy } from '@nestjs/passport';
import {Strategy} from "passport";
import {ExtractJwt} from "passport-jwt";
import {AuthService} from "./auth.service";
import {Payload} from "./payload.interface";
import {Repository} from "typeorm";
import {User} from "./user.entity";
import {InjectRepository} from "@nestjs/typeorm";


export class JwtStrategy extends PassportStrategy(Strategy){


    constructor(
        @InjectRepository(User)
        private userRepository : Repository<User>) {
        super(
            {
                secretOrKey: 'bestSecret',
                jwtFormRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            }
        );
    }


    async validate(payload : Payload): Promise<User>{
        const { username } = payload;
        const user = await this.userRepository.findOne({
            where:{
                username: username,
            }
        });

        return user;
    }

}