import { createReadStream, WriteStream } from "fs";
import { YtDlp } from "ytdlp-nodejs";

export class YTAudioDownloader {
  ytdlp: YtDlp = new YtDlp();
  async download(url: string) {
    try {
      const ytdlpFile = await this.ytdlp.getFileAsync(url, {
        onProgress: (progress) => {
          console.log(progress);
        },
        format: {
          type: "wav",
          filter: "audioonly",
          quality: 10,
        },
      });
      return ytdlpFile;
    } catch (error) {
      console.error("Error:", error);
    }
  }
}
