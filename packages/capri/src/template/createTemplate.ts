export async function createTemplate(indexHtml: string) {
  if (USE_CHEERIO) {
    const { CheerioTemplate } = await import("./CheerioTemplate.js");
    return new CheerioTemplate(indexHtml);
  } else {
    const { RegExpTemplate } = await import("./RegExpTemplate.js");
    return new RegExpTemplate(indexHtml);
  }
}
