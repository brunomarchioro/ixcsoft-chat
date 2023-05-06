import * as Server from "./server";

const storage = { users: [], messages: [] };

Server.start(storage);
