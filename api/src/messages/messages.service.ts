import { v4 as uuidv4 } from "uuid";
import sqlite3 from "sqlite3";

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
  db: sqlite3.Database;

  constructor(db: sqlite3.Database) {
    this.db = db;
  }

  findAll(): Promise<Message[]> {
    return new Promise((resolve, reject) => {
      this.db.all(`SELECT * FROM messages`, (error, rows) => {
        if (error) {
          reject(error.message);
        }

        resolve(
          rows.map((row: any) => ({
            id: row.id,
            fromUserId: row.from_user_id,
            toUserId: row.to_user_id,
            body: row.body,
          }))
        );
      });
    });
  }

  find({ fromUserId, toUserId }: FindAllMessagesParams): Promise<Message[]> {
    return new Promise((resolve, reject) => {
      this.db.all(`SELECT * FROM messages`, (error, rows) => {
        if (error) {
          reject(error.message);
        }

        const messages = rows.filter(
          (row: any) =>
            (row.from_user_id === fromUserId ||
              row.from_user_id === toUserId) &&
            (row.to_user_id === toUserId || row.to_user_id === fromUserId)
        );

        resolve(
          messages.map((row: any) => ({
            id: row.id,
            fromUserId: row.from_user_id,
            toUserId: row.to_user_id,
            body: row.body,
          }))
        );
      });
    });
  }

  create(payload: CreateMessageDTO): Promise<Message> {
    return new Promise((resolve, reject) => {
      const newMessage: Message = {
        id: uuidv4(),
        fromUserId: payload.fromUserId,
        toUserId: payload.toUserId,
        body: payload.body,
      };

      this.db.run(
        `INSERT INTO messages (id, from_user_id, to_user_id, body) VALUES (?, ?, ?, ?)`,
        [
          newMessage.id,
          newMessage.fromUserId,
          newMessage.toUserId,
          newMessage.body,
        ],
        (error) => {
          if (error) {
            reject(error.message);
          }

          resolve(newMessage);
        }
      );
    });
  }
}
