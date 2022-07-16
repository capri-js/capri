# react-render-to-string

Like [`renderToStaticMarkup`](https://reactjs.org/docs/react-dom-server.html#rendertostaticmarkup) but with **suspense support**.

The module is intended to be used with static site generators that support data fetching inside components rather than upfront.

It internally uses [renderToReadableStream](https://reactjs.org/docs/react-dom-server.html#rendertoreadablestream) and captures the result as string.

## Node.js vs. other runtimes

The package exports two different implementations, one for modern environments that support [Web Streams](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API), and one that uses [renderToPipeableStream](https://reactjs.org/docs/react-dom-server.html#rendertopipeablestream) instead.

**Note:** Node.js supports Web Streams since v.16.5.0, but the exports map of `react-dom/server` specifies a special build for `"node"` that does not include `renderToReadableStream`. Therefore, this package does the same and falls back to `renderToPipeableStream`.

## Usage

```js
import renderToString from "react-render-to-string";
import { App } from "./App";

const html = await renderToString(<App />);
```
