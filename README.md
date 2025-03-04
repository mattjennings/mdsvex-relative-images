# 🖼️ mdsvex-relative-images

This plugin allows you to reference images, videos, and other assets using relative paths directly from your MDsveX files.

## 🛠️ Install

```sh
npm install --save-dev mdsvex-relative-images
```

## ⚙️ Configure

### Option 1: Add to svelte.config.js

If you're using SvelteKit, add the plugin to your `svelte.config.js` file:

```js
// svelte.config.js
import relativeImages from "mdsvex-relative-images";

const config = {
  // ...
  preprocess: [ // ...
    mdsvex({ remarkPlugins: [relativeImages] })
  ],
  // ...
  extensions: [".svelte", ".svx"],
};

export default config;
```

### Option 2: Add to mdsvex.config.js
If you're using it as a standalone, then you can pass it to mdsvex like this:

```js
import relativeImages from "mdsvex-relative-images";

mdsvex({
  // ... rest of your config
  remarkPlugins: [relativeImages],
});
```

## 🚀 Usage

### Markdown Syntax

```md
![my image](./my-image.png)
```

### HTML Tags in Markdown

```md
<img src="./my-image.png" />
<video src="./my-video.mp4" />
```

### Svelte Components

```md
<SampleComponent path="./my-image.png" />
```
