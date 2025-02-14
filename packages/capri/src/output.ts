import * as fs from "fs";
import * as path from "path";
import urlJoin from "url-join";

import { urlToFileName } from "./path-utils.js";

export class Output {
  constructor(
    public dir: string,
    public createIndexFiles: boolean,
    public base: string,
  ) {}

  addBase(url: string) {
    return urlJoin(this.base, url);
  }

  resolve(url: string) {
    return path.join(
      this.dir,
      urlToFileName(url, this.createIndexFiles, this.base),
    );
  }

  write(url: string, content: string): string {
    const file = this.resolve(url);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, content);
    return file;
  }

  writeJson(url: string, data: unknown) {
    this.write(url, JSON.stringify(data, null, 2));
  }
}
