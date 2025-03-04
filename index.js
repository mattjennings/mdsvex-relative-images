// credit to pngwn doing majority of the plugin - https://github.com/pngwn/MDsveX/discussions/246#discussioncomment-720947

import { visit } from "unist-util-visit";
import toCamel from "just-camel-case";

const RE_SCRIPT_START =
  /<script(?:\s+?[a-zA-z]+(=(?:["']){0,1}[a-zA-Z0-9]+(?:["']){0,1}){0,1})*\s*?>/;
const RE_PROPS = /(\w+)\s*=\s*(["'])(.*?)\2/g;

export default function relativeImages() {
  return function transformer(tree) {
    const urls = new Map();
    const url_count = new Map();

    function transformUrl(url) {
      url = url.trim();
      url = decodeURIComponent(url)
      
      if (url.startsWith("./") || url.startsWith(".\\")) {
        // filenames can start with digits,
        // prepend underscore to guarantee valid module name
        let camel = `_${toCamel(url)}`;
        const count = url_count.get(camel);
        const dupe = urls.get(url);

        if (count && !dupe) {
          url_count.set(camel, count + 1);
          camel = `${camel}_${count}`;
        } else if (!dupe) {
          url_count.set(camel, 1);
        }

        urls.set(url, {
          path: url,
          id: camel,
        });

        return `{${camel}}`;
      }

      return url;
    }

    // transform urls in images
    visit(tree, ["image", "definition"], (node) => {
      node.url = transformUrl(node.url);
    });

    // transform src in html nodes
    visit(tree, "html", (node) => {
      let match;
      const props = [];

      while ((match = RE_PROPS.exec(node.value)) !== null) {
        if (match[1]) {
          props.push(match[3]);
        } else if (match[4]) {
          props.push(match[5]);
        }
      }

      for (let i = 0; i < props.length; i++) {
        let url = props[i];
        const transformed = transformUrl(url);
        node.value = node.value.replace(`${url}`, transformed);
      }
    });

    let scripts = "";
    urls.forEach((x) => (scripts += `import ${x.id} from "${x.path}";\n`));

    let is_script = false;

    visit(tree, "html", (node) => {
      if (RE_SCRIPT_START.test(node.value)) {
        is_script = true;
        node.value = node.value.replace(RE_SCRIPT_START, (script) => {
          return `${script}\n${scripts}`;
        });
      }
    });

    if (!is_script) {
      tree.children.push({
        type: "html",
        value: `<script>\n${scripts}</script>`,
      });
    }
  };
}
