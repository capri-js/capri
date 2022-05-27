import { NoHydration } from "solid-js/web";

export function renderMarkerFragment(
  Component,
  props,
  scriptProps,
  scriptContent
) {
  return (
    <>
      <Component {...props} />
      <NoHydration>
        <script {...scriptProps} innerHTML={scriptContent} />
      </NoHydration>
    </>
  );
}
