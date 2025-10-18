import fs from "fs/promises";
import path from "path";
import { getConfig } from "./GetConfig";
import { ICommandFunc } from "@/commands/types";

export interface IHandler {
  handler: ICommandFunc;
}

export class ReadFuncs {
  suffix: string = ".func.ts";
  folder: string = getConfig("FUNCS_DIR");

  async invoke(): Promise<IHandler[]> {
    const content = await fs.readdir(this.folder);
    const functions = content.filter((func) => func.endsWith(this.suffix));

    return await Promise.all(
      functions.map((func) => import(path.join(this.folder, func)))
    );
  }
}
