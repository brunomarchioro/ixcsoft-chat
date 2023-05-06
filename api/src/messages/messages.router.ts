import express, { Request, Response } from "express";
import { Message, MessagesService } from "./messages.service";

export class MessagesRouter {
  static init(messagesService: MessagesService) {
    const messagesRouter = express.Router();

    // GET messages
    messagesRouter.get("/", async (req: Request, res: Response) => {
      const fromUserId = req.query?.from || null;
      const toUserId = req.query?.to || null;

      if (fromUserId && toUserId) {
        const messages: Message[] = messagesService.find({
          fromUserId: fromUserId as string,
          toUserId: toUserId as string,
        });

        return res.status(200).json(messages);
      }

      res.status(200).json([]);
    });

    return messagesRouter;
  }
}
