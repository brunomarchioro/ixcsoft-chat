export interface User {
  id: string;
  name: string;
}

const HTTP_SERVER_HOST =
  import.meta.env.VITE_HTTP_SERVER_HOST || "http://localhost:3000";

export class UsersClient {
  static async findAll(): Promise<User[]> {
    try {
      const res = await fetch(`${HTTP_SERVER_HOST}/users`);
      return await res.json();
    } catch (e) {
      console.error(`Erro ao buscar usuários`, e);
      return [];
    }
  }

  static async getById(userId: string): Promise<User | null> {
    try {
      const res = await fetch(`${HTTP_SERVER_HOST}/users/${userId}`);
      return await res.json();
    } catch (e) {
      console.error(`Erro ao buscar usuário pelo id: [${userId}]`, e);
      return null;
    }
  }
}
