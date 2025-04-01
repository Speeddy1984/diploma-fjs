import {
    WebSocketGateway,
    SubscribeMessage,
    MessageBody,
    ConnectedSocket,
    OnGatewayInit,
    OnGatewayConnection,
    OnGatewayDisconnect,
  } from '@nestjs/websockets';
  import { Socket, Server } from 'socket.io';
  import { Logger } from '@nestjs/common';
  
  @WebSocketGateway({ namespace: '/support' })
  export class SupportGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private logger: Logger = new Logger('SupportGateway');
    private server!: Server;
  
    afterInit(server: Server) {
      this.server = server;
      this.logger.log('Инициализация gateway');
    }
  
    handleConnection(client: Socket) {
      this.logger.log(`Подключился клиент: ${client.id}`);
    }
  
    handleDisconnect(client: Socket) {
      this.logger.log(`Отключился клиент: ${client.id}`);
    }
  
    @SubscribeMessage('subscribeToChat')
    handleSubscribeToChat(@MessageBody() payload: { chatId: string }, @ConnectedSocket() client: Socket): void {
      client.join(payload.chatId);
      this.logger.log(`Клиент ${client.id} присоединился к комнате: ${payload.chatId}`);
    }
  
    broadcastNewMessage(chatId: string, message: any): void {
      this.server.to(chatId).emit('newMessage', message);
      this.logger.log(`Транслируется новое сообщение в чат: ${chatId}`);
    }

    @SubscribeMessage('sendMessage')
    handleSendMessage(
    @MessageBody() payload: { chatId: string; text: string },
    @ConnectedSocket() client: Socket
      ): void {
  
    const message = {
    text: payload.text,
    sender: client.id,
    sentAt: new Date(),
    };
    // Транслируем сообщение в комнату, на которую подписан клиент
    this.broadcastNewMessage(payload.chatId, message);
    }
  }
  