import fs from "fs";

export async function isWriteable(directory: string) {
  try {
    await fs.promises.access(directory, (fs.constants ?? (fs as any)).W_OK);
    return true;
  } catch (err) {
    return false;
  }
}
