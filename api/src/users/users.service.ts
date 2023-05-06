import { v4 as uuidv4 } from "uuid";
import sqlite3 from "sqlite3";

export interface User {
  id: string;
  name: string;
}

export class UsersService {
  db: sqlite3.Database;
  users: User[];

  constructor(db: sqlite3.Database) {
    this.db = db;
    this.users = [];
  }

  findAll(): Promise<User[]> {
    console.log("findAll");
    return new Promise((resolve, reject) => {
      this.db.all(`SELECT * FROM users`, (error, rows) => {
        console.log({ error, row: rows });
        if (error) {
          reject(error.message);
        }
        console.log(rows);
        resolve(rows as User[]);
      });
    });
  }

  getById(userId: string): Promise<User> {
    console.log("getById");
    return new Promise((resolve, reject) => {
      this.db.get(
        `SELECT * FROM users WHERE id = ?`,
        [userId],
        (error, row) => {
          console.log({ error, row });
          if (error) {
            reject(error.message);
          }
          console.log(row);
          resolve(row as User);
        }
      );
    });
  }

  create(name: string): Promise<User> {
    return new Promise((resolve, reject) => {
      const newUser = {
        id: uuidv4(),
        name,
      };

      this.db.run(
        `INSERT INTO users (id, name) VALUES (?, ?)`,
        [newUser.id, newUser.name],
        (error) => {
          console.log({ error });
          if (error) {
            reject(error.message);
          }

          resolve(newUser);
        }
      );
    });
  }
}
