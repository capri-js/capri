import { createElementVNode, createStaticVNode } from "vue";

export default {
  render() {
    return createElementVNode("capri-lagoon", {}, [createStaticVNode("", 1)]);
  },
  __file: "%COMPONENT_ID%",
};
