import plugin from "../index.js";

const config = {
  extensions: [".svelte.md", ".md", ".svx"],

  smartypants: {
    dashes: "oldschool",
  },

  remarkPlugins: [plugin],
  rehypePlugins: [],
};

export default config;
