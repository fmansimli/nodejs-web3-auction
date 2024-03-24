import { type Socket, io } from "socket.io-client";

export let socket: Socket;
const BASE_URL = import.meta.env.VITE_BASE_URL || "";

export const init = (token: string, callback: (succeed: boolean) => void) => {
  if (socket?.connected) {
    return callback(true);
  }
  socket = io(BASE_URL + "/eth", {
    reconnectionAttempts: 10,
    reconnection: true,
    reconnectionDelay: 1000,
    transports: ["websocket", "pooling"],
    auth: {
      token: "Bearer " + token
    }
  });

  socket.on("connect", () => {
    callback(true);
  });

  socket.on("disconnect", (reason) => {
    if (reason === "io server disconnect") {
      socket.connect();
    } else {
      callback(false);
    }
  });

  socket.on("connect_error", (_error) => {
    callback(false);
  });

  socket.on("unauthorized", (_data) => {});
  socket.on("success", (_data) => {});
};

export const disconnect = (callback: (succeed: boolean) => void): void => {
  try {
    if (socket?.connected) {
      socket.disconnect();
    }
    socket?.removeAllListeners();
    callback(true);
  } catch (error) {
    callback(false);
  }
};

export const reconnect = (): void => {
  if (socket?.disconnected) {
    socket.connect();
  }
};

type JoinRoomData = { room: string; signer?: string };

export const joinRoom = (data: JoinRoomData, callback: (roomSize: number) => void) => {
  socket.emit("join-room", data, (roomSize: number) => {
    callback(roomSize);
  });
};

type EmitNewBidData = { signer: string; ethers: string; room: string };

export const emitNewBid = (data: EmitNewBidData) => {
  socket.emit("new-bid", data);
};

export const onMessageIn = (callback: (data: any) => void) => {
  socket.on("msg-in", (data) => {
    callback(data);
  });
};

type NewBidData = { signer: string; ethers: string };

export const onNewBid = (callback: (data: NewBidData) => void) => {
  socket.on("new-bid", (data) => {
    callback(data);
  });
};

type NewUserData = { signer: string; size: number };

export const onNewUserJoined = (callback: (data: NewUserData) => void) => {
  socket.on("user-joined", (data) => {
    callback(data);
  });
};
