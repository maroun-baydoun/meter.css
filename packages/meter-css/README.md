# meter.css

The publishable package for styling the native HTML `<meter>` element.

## JavaScript imports

Import the stylesheet from a JavaScript bundler that supports CSS imports:

```js
import "meter.css/global.css";
import "meter.css/class.css";
```

The `global.css` stylesheet styles every `<meter>`. The `class.css` stylesheet is reserved for opt-in usage with `.meter`.

The package contains CSS only. It has no JavaScript runtime or custom elements.

The styles opt out of the WebKit native visual skin so the browser-specific meter pseudo-elements can be styled consistently. The native element, value semantics, and accessibility behavior remain intact.

The library does not assign theme values to its custom properties. Set the properties in your own stylesheet:

```css
meter {
  --meter-css-track: #e5e7eb;
  --meter-css-optimum: #16a34a;
  --meter-css-suboptimum: #f59e0b;
  --meter-css-sub-suboptimum: #dc2626;
}
```

### Custom properties

All properties are optional, but setting them is recommended because the library opts into a CSS-controlled appearance for WebKit.

| Property | Description |
| --- | --- |
| `--meter-css-track` | Background color of the meter track. |
| `--meter-css-optimum` | Color of the value when it is in the browser’s optimum state. |
| `--meter-css-suboptimum` | Color of the value when it is in the browser’s sub-optimum state. |
| `--meter-css-sub-suboptimum` | Color of the value when it is in the browser’s least-good state. |
