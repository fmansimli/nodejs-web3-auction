import type { Namespace, Server, Socket } from "socket.io";
import { Jwt } from "../services/jwt";

export const init = (io: Server) => {
  const nsp: Namespace = io.of("/eth");
  nsp.use(async (socket, next) => {
    try {
      const accessToken = socket.handshake.auth.token.split(" ")[1];
      const data: any = Jwt.verifyAsync(accessToken);
      socket.data = data;
      next();
    } catch (error: any) {
      next(error);
    }
  });

  nsp.on("connection", (socket: Socket) => {
    socket.on("join-room", async ({ room }, callback) => {
      try {
        const size = nsp.adapter.rooms.get(room)?.size;

        await socket.join(room);
        socket.to(room).emit("user-joined", { size });
        callback(size || 0);
      } catch (error) {
        callback(-1);
      }
    });

    socket.on("new-bid", async ({ room, signer, ethers }) => {
      socket.to(room).emit("new-bid", { signer, ethers });
    });

    socket.on("disconnect", () => {});
  });
};
