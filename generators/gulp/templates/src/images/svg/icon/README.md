# SVG: Icon

Any `.svg` file stored here will be available via `<use>` with its filename as the id. Files in this directory will have their fill and stroke colors replaced with `currentColor` so that these colors can easily be set in CSS using the `color` property.

```html
<svg>
  <use xlink:href="#my-svg" />
</svg>
```
