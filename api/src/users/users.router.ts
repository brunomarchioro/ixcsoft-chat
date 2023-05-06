import express, { Request, Response } from "express";
import { User, UsersService } from "./users.service";

export class UsersRouter {
  static init(usersService: UsersService) {
    const usersRouter = express.Router();

    // GET users
    usersRouter.get("/", async (req: Request, res: Response) => {
      const users: User[] = await usersService.findAll();
      res.status(200).json(users);
    });

    // GET users/:id
    usersRouter.get("/:id", async (req: Request, res: Response) => {
      const userId: string = req.params.id;
      const user = await usersService.getById(userId);

      if (user) {
        return res.status(200).json(user);
      }

      res.status(200).json(null);
    });

    // POST users
    usersRouter.post("/", async (req: Request, res: Response) => {
      const payload = req.body;
      const newUser = await usersService.create(payload.name);

      res.status(201).json(newUser);
    });

    return usersRouter;
  }
}
