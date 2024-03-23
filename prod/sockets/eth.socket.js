"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const jwt_1 = require("../services/jwt");
const init = (io) => {
    const nsp = io.of("/eth");
    nsp.use(async (socket, next) => {
        try {
            const accessToken = socket.handshake.auth.token.split(" ")[1];
            const data = jwt_1.Jwt.verifyAsync(accessToken);
            socket.data = data;
            next();
        }
        catch (error) {
            next(error);
        }
    });
    nsp.on("connection", (socket) => {
        socket.on("join-room", async ({ room }, callback) => {
            try {
                const size = nsp.adapter.rooms.get(room)?.size;
                await socket.join(room);
                socket.to(room).emit("user-joined", { size });
                callback(size || 0);
            }
            catch (error) {
                callback(-1);
            }
        });
        socket.on("new-bid", async ({ room, signer, ethers }) => {
            socket.to(room).emit("new-bid", { signer, ethers });
        });
        socket.on("disconnect", () => { });
    });
};
exports.init = init;
