import * as componentModule from "virtual:capri-component";
import { withCtx } from "vue";
import { ssrRenderComponent, ssrRenderSlot } from "vue/server-renderer";

const { default: component, options } = componentModule;

const __sfc__ = {
  __name: "Island",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const slots = Object.fromEntries(
        Object.entries(_ctx.$slots).map(([name, fn]) => [
          name,
          withCtx((_, _push, _parent, _scopeId) => {
            _push(`<capri-slot style="display:contents" name="${name}">`);
            ssrRenderSlot(
              _ctx.$slots,
              name,
              {},
              null,
              _push,
              _parent,
              _scopeId
            );
            _push(`</capri-slot>`);
          }),
        ])
      );

      _push(`<capri-island>`);
      _push(ssrRenderComponent(component, _attrs, slots, _parent));
      _push(
        `<script type="application/json" data-island="%COMPONENT_ID%">${JSON.stringify(
          { props: _attrs, options }
        )}</script>`
      );
      _push(`</capri-island>`);
    };
  },
};
__sfc__.__file = "%COMPONENT_ID%";
export default __sfc__;
