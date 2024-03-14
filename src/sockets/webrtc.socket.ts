import type { Namespace, Server, Socket } from "socket.io";
import { Jwt } from "../services/jwt";

export const init = (io: Server) => {
  const nsp: Namespace = io.of("/webrtc");
  nsp.use(async (socket, next) => {
    try {
      const accessToken = socket.handshake.auth.token.split(" ")[1];
      const data: any = await Jwt.verifyAsync(accessToken);
      socket.data = data;
      next();
    } catch (error: any) {
      next(error);
    }
  });

  nsp.on("connection", (socket: Socket) => {
    socket.on("join", (id: string, callback) => {
      const size = nsp.adapter.rooms.get(id)?.size;
      if (size && size >= 2) {
        return callback(false);
      }
      socket.join(id);
      callback(true);
    });

    socket.on("disconnect", () => {
      socket.to(Array.from(socket.data.ids)).emit("user-left", {
        id: socket.id
      });
    });

    socket.on("disconnecting", (_reason) => {});

    socket.on("get-sockets", async ({ room }, callback) => {
      try {
        const sockets = await nsp.in(room).fetchSockets();
        callback(sockets.map((socket) => ({ id: socket.id, ...socket.data })));
      } catch (error) {
        callback(0);
      }
    });
  });
};
