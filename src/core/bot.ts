import { getConfig } from "@/utils/GetConfig";
import { ReadFuncs } from "@/utils/ReadFuncs";
import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";

class Bot {
  bot: Telegraf;
  functions: ReadFuncs;
  constructor() {
    this.bot = new Telegraf(getConfig("BOT_KEY"));
    this.functions = new ReadFuncs();
  }

  async init() {
    const handlers = await this.functions.invoke();

    for (const { handler } of handlers) {
      this.bot.on("message", (ctx) => {
        if (!handler.customFilter && !ctx.text?.includes(handler.query)) return;

        return handler.callback(ctx, handler.name);
      });
    }

    await this.bot.launch();

    process.once("SIGINT", () => this.bot.stop("SIGINT"));
    process.once("SIGTERM", () => this.bot.stop("SIGTERM"));
  }
}

export const SDK = new Bot();
