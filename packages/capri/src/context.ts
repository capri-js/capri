export type RenderContext = {
  status(code: number): void;
  getHeader(name: string): string | null | undefined;
  setHeader(name: string, value: string): void;
};

export class StaticRenderContext implements RenderContext {
  statusCode = 200;
  headers: Record<string, string> = {};
  status(code: number) {
    this.statusCode = code;
  }
  getHeader(name: string) {
    return this.headers[name];
  }
  setHeader(name: string, value: string) {
    this.headers[name] = value;
  }
}
