export function renderMarkerFragment(Component, props, scriptProps, json) {
  return (
    <>
      <Component {...props} />
      <script {...scriptProps} dangerouslySetInnerHTML={{ __html: json }} />
    </>
  );
}
