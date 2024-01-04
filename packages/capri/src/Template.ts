/**
 * Template to analyze and modify the HTML.
 */
export class Template {
  private html: string;

  constructor(html: string) {
    this.html = html;
  }

  /**
   * Find all hydration scripts and return their data-island attribute and
   * their text content.
   */
  getIslands() {
    return [
      ...this.html.matchAll(
        /<script[^>]+data-island="(.+?)"[^>]*>([\s\S]+?)<\/script>/gi,
      ),
    ].map(([, island, json]) => ({ island, json }));
  }

  /**
   * Remove all script tags with matching src or text.
   */
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
      },
    );
  }

  /**
   * Insert markup into the html with the keys being CSS selectors.
   */
  insertMarkup(markup: Record<string, string>) {
    for (const [selector, insert] of Object.entries(markup)) {
      if (insert) {
        if (!selector.match(/^#?[\w]+$/)) {
          throw new Error(`Unsupported selector: ${selector}`);
        }
        if (selector.startsWith("#")) {
          // id selector - insert after the opening tag
          this.html = this.html.replace(
            new RegExp(`\\bid\\s*=\\s*"${selector.slice(1)}"[^>]*>`),
            `$&${insert}`,
          );
        } else {
          // type selector - insert before the closing tag
          this.html = this.html.replace(
            new RegExp(`<\\s*/\\s*${selector}[^>]*>`),
            `${insert}$&`,
          );
        }
      }
    }
  }

  /**
   * Return the HTML.
   */
  toString() {
    return this.html;
  }
}
