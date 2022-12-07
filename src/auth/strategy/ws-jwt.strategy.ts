import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class WsJwtStrategy extends PassportStrategy(Strategy, 'wsjwt') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromUrlQueryParameter('bearerToken'),
            secretOrKey: process.env.SECRET_KEY,
        })
    }

    async validate(payload: any) {
        return { userId: payload.sub, email: payload.email };
    }
}