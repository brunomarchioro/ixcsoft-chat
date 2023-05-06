import path from "path";
import sqlite3 from "sqlite3";
import fs from "fs";

const filePath = path.join(__dirname, "../data/chat.db");

export class DataBase {
  static init() {
    if (fs.existsSync(filePath)) {
      const db = new sqlite3.Database(filePath);

      db.exec("DELETE FROM messages;");
      db.exec("DELETE FROM users;");
    } else {
      const db = new sqlite3.Database(filePath, (error) => {
        if (error) {
          return console.error(error.message);
        }
      });

      db.exec("PRAGMA foreign_keys = ON;");

      db.exec(`
        CREATE TABLE IF NOT EXISTS users (
          id   VARCHAR(36) PRIMARY KEY,
          name VARCHAR(300) NOT NULL
        );
      `);

      db.exec(`
        CREATE TABLE IF NOT EXISTS messages (
          id           VARCHAR(36) PRIMARY KEY,
          from_user_id VARCHAR(36) NOT NULL,
          to_user_id   VARCHAR(36) NOT NULL,
          body         TEXT NOT NULL,
          FOREIGN KEY (from_user_id) REFERENCES users (id),
          FOREIGN KEY (to_user_id) REFERENCES users (id)
        );
      `);

      console.log("Banco de dados iniciado");
    }
  }

  static getDb() {
    const db = new sqlite3.Database(filePath, (error) => {
      if (error) {
        return console.error(error.message);
      }

      console.log("Conexão com Banco de dados estabelecida");
    });

    return db;
  }
}
