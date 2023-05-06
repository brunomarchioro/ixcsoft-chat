export interface Message {
  id: string;
  fromUserId: string;
  toUserId: string;
  body: string;
}

export interface FindAllParams {
  fromUserId: string;
  toUserId: string;
}

const HTTP_SERVER_HOST =
  import.meta.env.VITE_HTTP_SERVER_HOST || "http://localhost:3000";

export class MessagesClient {
  static async findAll({
    fromUserId,
    toUserId,
  }: FindAllParams): Promise<Message[]> {
    try {
      const res = await fetch(
        `${HTTP_SERVER_HOST}/messages?from=${fromUserId}&to=${toUserId}`
      );

      return await res.json();
    } catch (e) {
      console.error(`Erro ao buscar mensagens`, e);
      return [];
    }
  }
}
