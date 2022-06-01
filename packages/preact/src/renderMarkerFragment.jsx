export function renderMarkerFragment(Component, props, scriptProps, json) {
  return (
    // In order to hydrate a Preact component it must be the first child element.
    // To guarantee this, we wrap it in an extra div and set it to
    // `display: contents` in order to not affect the styling.
    <div data-island-root style={{ display: "contents" }}>
      <Component {...props} />
      <script {...scriptProps} dangerouslySetInnerHTML={{ __html: json }} />
    </div>
  );
}
