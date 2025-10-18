import { Context } from "telegraf";

export interface ICommandFunc {
  name: string;
  query: string;
  customFilter?: boolean | null;
  callback: (ctx: Context, name: string) => Promise<void>;
}
