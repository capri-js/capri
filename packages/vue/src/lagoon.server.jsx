import component from "virtual:capri-component";
import { ssrRenderComponent } from "vue/server-renderer";

const __sfc__ = {
  __name: "Lagoon",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<capri-lagoon style="display:contents">`);
      _push(ssrRenderComponent(component, _attrs, _ctx.$slots, _parent));
      _push(`</capri-lagoon>`);
    };
  },
};
__sfc__.__file = "%COMPONENT_ID%";
export default __sfc__;
