import {
  claim_element,
  init,
  insert_hydration,
  noop,
  safe_not_equal,
  SvelteComponent,
} from "svelte/internal";

function create_fragment(ctx) {
  let el;
  return {
    c: noop,
    m(target, anchor) {
      insert_hydration(target, el, anchor);
    },
    l(nodes) {
      el = claim_element(nodes, "CAPRI-LAGOON", {});
    },
    p: noop,
    d(detaching) {
      console.log("detach", detaching);
    },
  };
}

export default class Lagoon extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, null, create_fragment, safe_not_equal, {});
  }
}
