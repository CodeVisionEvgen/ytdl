import { config } from "dotenv";
config();

export interface IConfig {
  BOT_KEY: string;
  FUNCS_DIR: string;
  NODE_ENV: "dev" | "prod";
}

export const getConfig = (key: keyof IConfig): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }

  return value;
};
