export interface IslandMarker {
  island: string;
  json: string;
}

export interface Template {
  /** Find all hydration scripts and return their data-island attribute and their text content. */
  getIslands(): IslandMarker[];

  /** Remove all script tags with matching src or text. */
  removeScripts(test: { src?: RegExp; text?: RegExp }): void;

  /** Remove all link tags with rel="modulepreload" */
  removeModulePreloadLinks(): void;

  /** Insert markup into the html with the keys being CSS selectors. */
  insertMarkup(markup: Record<string, string>): void;

  /** Return the HTML */
  toString(): string;
}
