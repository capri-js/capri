# react-render-to-string

Like [`renderToStaticMarkup`](https://reactjs.org/docs/react-dom-server.html#rendertostaticmarkup) but with **suspense support**.

The module is intended to be used with static site generators that support data fetching inside components rather than upfront.

It internally uses [`renderToPipeableStream`](https://reactjs.org/docs/react-dom-server.html#rendertopipeablestream) and captures the result as string.

## Usage

```js
import { render } from "react-render-to-string";
import { App } from "./App";

const html = await render(<App />);
```
