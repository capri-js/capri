import { ComponentType } from "react";

export function renderMarkerFragment(
  Component: ComponentType,
  props: object,
  scriptProps: object,
  scriptContent: string
) {
  return (
    <>
      <Component {...props} />
      <script
        {...scriptProps}
        dangerouslySetInnerHTML={{ __html: scriptContent }}
      />
    </>
  );
}
