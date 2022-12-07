import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Request as RequestType } from 'express';

@Injectable()
export class WsJwtStrategy extends PassportStrategy(Strategy, 'wsjwt') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                WsJwtStrategy.extractJWT,
                ExtractJwt.fromUrlQueryParameter('bearerToken'),
            ]),
            secretOrKey: process.env.SECRET_KEY,
        })
    }

    private static extractJWT(req: RequestType): string | null {
        if (
          req.cookies &&
          'token' in req.cookies &&
          req.cookies.user_token.length > 0
        ) {
          return req.cookies.token;
        }
        return null;
      }

    async validate(payload: any) {
        return { userId: payload.sub, email: payload.email };
    }
}