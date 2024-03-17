"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const jwt_1 = require("../services/jwt");
const init = (io) => {
    const nsp = io.of("/webrtc");
    nsp.use(async (socket, next) => {
        try {
            const accessToken = socket.handshake.auth.token.split(" ")[1];
            const data = await jwt_1.Jwt.verifyAsync(accessToken);
            socket.data = data;
            next();
        }
        catch (error) {
            next(error);
        }
    });
    nsp.on("connection", (socket) => {
        socket.on("join", (id, callback) => {
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
        socket.on("disconnecting", (_reason) => { });
        socket.on("get-sockets", async ({ room }, callback) => {
            try {
                const sockets = await nsp.in(room).fetchSockets();
                callback(sockets.map((socket) => ({ id: socket.id, ...socket.data })));
            }
            catch (error) {
                callback(0);
            }
        });
    });
};
exports.init = init;
