import { SupportRequest } from '../schemas/support-request.schema';
import { Message } from '../schemas/message.schema';

export interface CreateSupportRequestDto {
  user: string;
  text: string;
}

export interface SendMessageDto {
  author: string;
  supportRequest: string;
  text: string;
}

export interface MarkMessagesAsReadDto {
  user: string;
  supportRequest: string;
  createdBefore: Date;
}

export interface GetChatListParams {
  user: string | null;
  isActive: boolean;
  limit?: number;
  offset?: number;
}

export interface ISupportRequestService {
  findSupportRequests(params: GetChatListParams): Promise<SupportRequest[]>;
  sendMessage(data: SendMessageDto): Promise<Message>;
  getMessages(supportRequest: string): Promise<Message[]>;
  subscribe(
    handler: (supportRequest: SupportRequest, message: Message) => void,
  ): () => void;
}

export interface ISupportRequestClientService {
  createSupportRequest(data: CreateSupportRequestDto): Promise<SupportRequest>;
  markMessagesAsRead(params: MarkMessagesAsReadDto): Promise<void>;
  getUnreadCount(supportRequest: string): Promise<number>;
}

export interface ISupportRequestEmployeeService {
  markMessagesAsRead(params: MarkMessagesAsReadDto): Promise<void>;
  getUnreadCount(supportRequest: string): Promise<number>;
  closeRequest(supportRequest: string): Promise<void>;
}
