import { Context } from "koa";

import Router from "koa-router";
const router = new Router();

const getInfo = async (ctx: Context) => {
  ctx.body = {
    data: "okkk",
  };
};

router.get(`/info`, getInfo);

export default router;
