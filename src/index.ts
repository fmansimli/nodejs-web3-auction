import http from "http";
import app from "./app";

import * as AppSocket from "./sockets/socket";
import { Logger } from "./services/log";
import { mongo } from "./config/db";

const httpServer = http.createServer(app);

const PORT = process.env.PORT || 6007;
const JWT_SECRET = process.env.JWT_SECRET;
const MONGO_URI = process.env.MONGO_URI;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET must be defined");
}
if (!MONGO_URI) {
  throw new Error("MONGO_URI must be defined");
}

async function bootstrap() {
  try {
    await mongo.connect(MONGO_URI as string);

    httpServer.listen(PORT, () => {
      AppSocket.initialize(httpServer);
      Logger.log("**** listening on port " + PORT);
    });
  } catch (error) {
    Logger.error(error);
  }
}

bootstrap();
