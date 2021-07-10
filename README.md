# mdsvex-relative-images

Allows you to use relative urls to images from the md file.

# Usage

```
npm install mdsvex-relative-images
```

Add the plugin to your mdsvex config

```js
// mdsvex.config.js
import relativeImages from "mdsvex-relative-images";

export default {
  // ... rest of your config
  remarkPlugins: [relativeImages],
};
```

Now you can load images like so:

```md
![my image](./my-image.png)
```

It also works for img and video tags:

```svelte
<img src="./my-image.png" />
<video src="./my-video.mp4" />
```
