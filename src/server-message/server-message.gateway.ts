import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";
import { Socket } from 'socket.io';

@WebSocketGateway({
    // transports: ['polling'],
    // cors: {
    //     origin: ['http://localhost:4200'],
    //     credentials: true
    // }
})
export class ServerMessageGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    handleDisconnect(client: any) {
    }
    handleConnection(client: any, ...args: any[]) {
    }
    afterInit(server: any) {
    }

    @SubscribeMessage('sendMessage')
    handleEvent(@MessageBody() data: string): string {
        console.log(data)
        return data;
    }
}