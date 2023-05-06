import { v4 as uuidv4 } from "uuid";

export interface Message {
  id: string;
  fromUserId: string;
  toUserId: string;
  body: string;
}

export interface CreateMessageDTO {
  fromUserId: string;
  toUserId: string;
  body: string;
}

export interface FindAllMessagesParams {
  fromUserId: string;
  toUserId: string;
}

export class MessagesService {
  messages: Message[];

  constructor(messages: Message[]) {
    this.messages = messages;
  }

  findAll() {
    return this.messages;
  }

  find({ fromUserId, toUserId }: FindAllMessagesParams) {
    return this.messages.filter(
      (m) =>
        (m.fromUserId === fromUserId || m.fromUserId === toUserId) &&
        (m.toUserId === toUserId || m.toUserId === fromUserId)
    );
  }

  create(payload: CreateMessageDTO) {
    const newMessage: Message = {
      id: uuidv4(),
      fromUserId: payload.fromUserId,
      toUserId: payload.toUserId,
      body: payload.body,
    };
    this.messages.push(newMessage);
    return newMessage;
  }
}
