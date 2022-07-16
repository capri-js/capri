import { Template } from "./Template.js";

export class RegExpTemplate implements Template {
  private html: string;

  constructor(html: string) {
    this.html = html;
  }

  getIslands() {
    return [
      ...this.html.matchAll(
        /<script[^>]+data-island="(.+?)"[^>]*>([\s\S]+?)<\/script>/gi
      ),
    ].map(([, island, json]) => ({ island, json }));
  }

  removeScripts(test: { src?: RegExp; text?: RegExp }) {
    this.html = this.html.replace(
      /<\s*script(.*?)>([\s\S]*?)<\s*\/\s*script\s*>\s*/gi,
      (match, attrs, text) => {
        if (test.src) {
          const [, src] = /\bsrc\s*=\s*"(.+?)"/.exec(attrs) ?? [];
          if (src && src.match(test.src)) return "";
        }
        if (test.text && text.match(test.text)) {
          return "";
        }
        return match;
      }
    );
  }

  removeModulePreloadLinks() {
    this.html = this.html.replace(
      /<\s*link[^>]+rel\s*=\s*["']?modulepreload["']?[^>]*>\s*/gi,
      ""
    );
  }

  insertMarkup(markup: Record<string, string>) {
    for (const [selector, insert] of Object.entries(markup)) {
      if (!selector.match(/^#?[\w]+$/)) {
        throw new Error(`Unsupported selector: ${selector}`);
      }
      if (selector.startsWith("#")) {
        // id selector - insert after the opening tag
        this.html = this.html.replace(
          new RegExp(`\\bid\\s*=\\s*"${selector.slice(1)}"[^>]*>`),
          `$&${insert}`
        );
      } else {
        // type selector - insert before the closing tag
        this.html = this.html.replace(
          new RegExp(`<\\s*/\\s*${selector}[^>]*>`),
          `${insert}$&`
        );
      }
    }
  }

  toString() {
    return this.html;
  }
}
