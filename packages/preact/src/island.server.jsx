import * as componentModule from "virtual:capri-component";

const { default: Component, options } = componentModule;

function Island({ children, ...props }) {
  const wrappedChildren = children && (
    <capri-children style={{ display: "contents" }}>{children}</capri-children>
  );

  const scriptContent = JSON.stringify({ props, options });
  return (
    <capri-island style={{ display: "contents" }}>
      <Component {...props}>{wrappedChildren}</Component>
      <script
        type="application/json"
        data-island="%COMPONENT_ID%"
        dangerouslySetInnerHTML={{ __html: scriptContent }}
      />
    </capri-island>
  );
}

export default Island;
