import { Server } from "socket.io";
import * as webRTC from "./webrtc.socket";

let io: any;

export const initialize = (http: any) => {
  io = new Server(http, {
    cors: {
      origin: ["*"],
      methods: ["POST", "GET"],
      credentials: true
    },
    transports: ["websocket", "polling"]
  });

  webRTC.init(io);
};
