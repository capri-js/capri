import * as cheerio from "cheerio";

export class Template {
  private $: cheerio.CheerioAPI;

  constructor(html: string) {
    this.$ = cheerio.load(html);
  }

  /**
   * Find all hydration scripts and return their data-island attribute and
   * their text content.
   */
  getIslands() {
    return this.$('script[type="application/json"][data-island]')
      .toArray()
      .map((el) => {
        const $el = this.$(el);
        return {
          island: $el.attr("data-island") ?? "",
          json: $el.text(),
        };
      });
  }

  /**
   * Remove all script tags with matching src or text.
   */
  removeScripts(test: { src?: RegExp; text?: RegExp }) {
    this.$("script").each((i, el) => {
      const $el = this.$(el);
      const src = $el.attr("src");
      const text = $el.text();

      if (test.src) {
        if (src && src.match(test.src)) {
          removeNodeAndWhitespaceSiblings($el, this.$);
        }
      }
      if (test.text && text.match(test.text)) {
        removeNodeAndWhitespaceSiblings($el, this.$);
      }
    });
  }

  /**
   * Insert markup into the html with the keys being CSS selectors.
   */
  insertMarkup(markup: Record<string, string>) {
    for (const [selector, html] of Object.entries(markup)) {
      this.$(selector).first().append(this.$(html));
    }
  }

  /**
   * Return the HTML.
   */
  toString() {
    return this.$.html();
  }
}

function removeNodeAndWhitespaceSiblings(
  $el: cheerio.Cheerio<cheerio.Element>,
  $: cheerio.CheerioAPI,
) {
  removeWhitespaceSiblings($el, $);
  removeWhitespaceSiblings($el.prev(), $);
  $el.remove();
}

function removeWhitespaceSiblings(
  $el: cheerio.Cheerio<cheerio.Element>,
  $: cheerio.CheerioAPI,
) {
  const el = $el.get(0);
  let next = el?.nextSibling;
  while (next && next.nodeType === 3 && next.data.trim().length === 0) {
    const $t = $(next);
    next = next.nextSibling;
    $t.remove();
  }
}
