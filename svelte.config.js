import { mdsvex } from "mdsvex";
import { mdsvexConfig } from "./mdsvex.config.js";
// import adapter from "@sveltejs/adapter-netlify";
import adapter from '@sveltejs/adapter-static';

const dev = process.env.NODE_ENV === 'development';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: [".svelte", ...mdsvexConfig.extensions],
  preprocess: [
    mdsvex(mdsvexConfig),
  ],
	kit: {
    target: "#svelte",
		adapter: adapter(),
    trailingSlash: 'never',
	}
};

export default config;