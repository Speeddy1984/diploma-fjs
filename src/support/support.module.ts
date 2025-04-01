import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SupportRequest, SupportRequestSchema } from './schemas/support-request.schema';
import { Message, MessageSchema } from './schemas/message.schema';
import { SupportService } from './support.service';
import { SupportClientController } from './support.client.controller';
import { SupportManagerController } from './support.manager.controller';
import { SupportCommonController } from './support.common.controller';
import { SupportGateway } from './support.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: SupportRequest.name, schema: SupportRequestSchema }]),
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
  ],
  providers: [SupportService, SupportGateway],
  exports: [SupportService],
  controllers: [SupportClientController, SupportManagerController, SupportCommonController],
})
export class SupportModule {}