import adapter from "@sveltejs/adapter-cloudflare";
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { escapeSvelte, mdsvex } from "mdsvex";
import shiki from "shiki";
import { loadTheme } from "shiki-themes";

async function codeHighlighter(code, langStr) {
  let lang = undefined;
  const lineOptions = [];

  if (langStr) {
    const langArr = langStr.split("{");
    lang = langArr[0];

    let lineNumbersStr = langArr[1];
    if (lineNumbersStr) {
      lineNumbersStr = lineNumbersStr.substring(0, lineNumbersStr.length - 1);
      const lineNumberRanges = lineNumbersStr.split(",");
      const lineOptionClasses = ["line-highlight"];

      lineNumberRanges.forEach((lineNumberRange) => {
        const numbers = lineNumberRange.split("-");
        const startNum = parseInt(numbers[0]);

        lineOptions.push({ line: startNum, classes: lineOptionClasses });

        if (numbers.length > 1) {
          const endNum = parseInt(numbers[1]);
          for (let i = startNum + 1; i <= endNum; i++) {
            lineOptions.push({ line: i, classes: lineOptionClasses });
          }
        }
      });
    }
  }

  const tokyoNight = await loadTheme("./themes/tokyo-night.json");
  const highlighter = await shiki.getHighlighter({ theme: tokyoNight, langs: lang ? [lang] : undefined });
  const html = escapeSvelte(highlighter.codeToHtml(code, { lang, lineOptions }));
  return `{@html \`${html}\` }`;
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: [".svelte", ".md"],
  preprocess: [
    vitePreprocess(),
    mdsvex({
      extensions: [".md"],
      highlight: {
        highlighter: codeHighlighter
      }
    })
  ],
  kit: {
    adapter: adapter({
      routes: {
        include: ['/*'],
        exclude: ['<all>']
      },
      platformProxy: {
        configPath: 'wrangler.toml',
        environment: undefined,
        experimentalJsonConfig: false,
        persist: false
      }
    }),
    prerender: {
      handleHttpError: ({ path, referrer, message }) => {
        // Ignore 404 errors for missing assets
        if (message.includes('404')) {
          console.warn(`404 error on ${path} (referrer: ${referrer})`);
          return;
        }
        // Throw an error for other HTTP errors
        throw new Error(message);
      }
    }
  }
};

export default config;
