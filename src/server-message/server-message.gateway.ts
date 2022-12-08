import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";
import { Socket } from 'socket.io';
import { WsAuthGuard } from "src/auth/guard/ws-auth.guard";

@WebSocketGateway({
    // transports: ['polling'],
    // cors: {
    //     origin: ['http://localhost:4200'],
    //     credentials: true
    // }
})
export class ServerMessageGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    handleDisconnect(client: Socket) {
        console.log("dis:",client.id)
    }
    handleConnection(client: Socket, ...args: any[]) {
        console.log("con:",client.id)
    }
    afterInit(server: any) {
    }

    @SubscribeMessage('sendMessage')
    @UseGuards(WsAuthGuard)
    handleEvent(client: Socket, data: string): string {
        console.log(data)
        console.log("sender:", client.id )
        return data;
    }
}