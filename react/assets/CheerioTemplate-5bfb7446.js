import * as cheerio from "cheerio";
class CheerioTemplate {
  constructor(html) {
    this.$ = cheerio.load(html);
  }
  getIslands() {
    return this.$('script[type="application/json"][data-island]').toArray().map((el) => {
      const $el = this.$(el);
      return {
        island: $el.attr("data-island") ?? "",
        json: $el.text()
      };
    });
  }
  removeScripts(test) {
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
  removeModulePreloadLinks() {
    this.$('link[rel="modulepreload"]').remove();
  }
  insertMarkup(markup) {
    for (const [selector, html] of Object.entries(markup)) {
      this.$(selector).first().append(this.$(html));
    }
  }
  toString() {
    return this.$.html();
  }
}
function removeNodeAndWhitespaceSiblings($el, $) {
  removeWhitespaceSiblings($el, $);
  removeWhitespaceSiblings($el.prev(), $);
  $el.remove();
}
function removeWhitespaceSiblings($el, $) {
  const el = $el.get(0);
  let next = el == null ? void 0 : el.nextSibling;
  while (next && next.nodeType === 3 && next.data.trim().length === 0) {
    const $t = $(next);
    next = next.nextSibling;
    $t.remove();
  }
}
export {
  CheerioTemplate
};
