import Koa from "koa";
import bodyParser from "koa-bodyparser";
import compose from "koa-compose";
import helmet from "koa-helmet";
import logger from "koa-logger";
import cors from "koa2-cors";

import { config } from "../constants/config";
import infoRoute from "./routes/info";

const app = new Koa();

const errorHandler = async (ctx: Koa.Context, next: any) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = err.message;
    ctx.app.emit("error", err, ctx);
  }
};

app.use(
  compose([
    cors({
      origin: "*"
    }),
    errorHandler,
    bodyParser(),
    logger(),
    helmet(),
    infoRoute.routes()
  ])
);

const server = app
  .listen(config.serverPort, async () => {
    console.log(`Server listening on port: ${config.serverPort}`);
  })
  .on("error", (err) => {
    console.error(err);
  });

export default server;
