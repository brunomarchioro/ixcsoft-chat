import { v4 as uuidv4 } from "uuid";

export interface User {
  id: string;
  name: string;
}

export class UsersService {
  users: User[];

  constructor(users: User[]) {
    this.users = users;
  }

  findAll() {
    return this.users;
  }

  getById(userId: string) {
    const user = this.users.find((u) => u.id === userId);
    if (user) {
      return user;
    }
    return null;
  }

  create(name: string) {
    const newUser = {
      id: uuidv4(),
      name,
    };

    this.users.push(newUser);

    return newUser;
  }
}
