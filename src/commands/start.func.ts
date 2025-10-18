import { log } from "@/utils/Logger";
import { ICommandFunc } from "./types";
import { START_RESPONSE } from "./start.const";

export const handler: ICommandFunc = {
  name: "Start",
  query: "/start",
  callback: async (ctx, name) => {
    log("START FROM", ctx.from);
    ctx.reply(START_RESPONSE);
  },
};
