# 🖼️ mdsvex-relative-images

This plugin allows you to reference images, videos, and other assets using relative paths and aliases directly from your MDsveX files.

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
![image](./my-image.png)
![image](../images/another-folder-image.png)
![image]($lib/images/lib-image.png)
![image](./my-image.png?format=webp)
```

### HTML Tags in Markdown

```md
<img src="./my-image.png" />
<img src="../images/another-folder-image.png" />
<img src="$lib/images/lib-image.png" />
<img src="./my-image.png?format=webp" />
```

### Svelte Components

```md
<SampleComponent path="./my-image.png" />
<SampleComponent path="../images/another-folder-image.png" />
<SampleComponent path="$lib/images/lib-image.png" />
<SampleComponent path="./my-image.png?format=webp" />
```
