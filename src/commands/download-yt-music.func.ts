import { log } from "@/utils/Logger";
import { ICommandFunc } from "./types";
import { YTAudioDownloader } from "@/services/YTAudioDownloader";

export const handler: ICommandFunc = {
  name: "Download YT audio",
  query: "",
  callback: async (ctx, name) => {
    const downloader = new YTAudioDownloader();
    console.log(name);
    if (ctx.text) {
      const song = await downloader.download(ctx.text);
      console.log(song);
      if (song)
        ctx.sendAudio({
          source: Buffer.from(await song.bytes()),
          filename: song.name,
        });
      // ctx.sendAudio(song.outputFile);
    }
  },
};
