import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";

@WebSocketGateway()
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