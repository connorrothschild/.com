import { visit } from "unist-util-visit";
import { toString as hToString } from "hast-util-to-string";
import type { Element } from "hast";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export default function rehypeHeadingIds() {
  return (tree: any, file: any) => {
    const usedSlugs = new Set<string>();
    let currentH2Slug = "";

    visit(tree, "element", (node: Element) => {
      if (node.tagName.match(/^h[2-6]$/)) {
        const depth = Number.parseInt(node.tagName[1]);
        const value = hToString(node);
        let slug = slugify(value);

        if (depth === 2) {
          currentH2Slug = slug;
        } else if (depth === 3) {
          slug = `${currentH2Slug}-${slug}`;
        }

        let uniqueSlug = slug;
        let counter = 1;
        while (usedSlugs.has(uniqueSlug)) {
          uniqueSlug = `${slug}-${counter}`;
          counter++;
        }
        usedSlugs.add(uniqueSlug);

        node.properties = node.properties || {};
        node.properties.id = uniqueSlug;

        // Store TOC information in the file data
        file.data.toc = file.data.toc || [];
        file.data.toc.push({
          value,
          depth,
          slug: uniqueSlug,
        });
      }
    });
  };
}
