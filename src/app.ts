import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import path from "path";

import { AppConfig } from "./config/config";
import { catchError, catch404 } from "./middlewares/error";
import indexRouter from "./routes";

const app = express();

AppConfig.init();

app.use(express.json());
app.use(express.static(path.join(process.cwd(), "./prod/public")));

app.use(helmet());
app.use(cors({ origin: ["http://localhost:3001"] }));
app.use(morgan("dev"));

app.use("/api", indexRouter);
app.use(catch404);
app.use(catchError);

export default app;
