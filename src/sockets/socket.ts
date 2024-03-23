import { Server } from "socket.io";
import * as eth from "./eth.socket";

let io: Server;

export const initialize = (http: any) => {
  io = new Server(http, {
    cors: {
      origin: ["http://localhost:3001"],
      methods: ["POST", "GET"],
      credentials: true
    },
    transports: ["websocket", "polling"]
  });

  eth.init(io);
};
