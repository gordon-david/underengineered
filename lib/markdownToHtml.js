import MarkdownIt from "markdown-it";
import hljs from 'highlight.js';
import markdownItPlantuml from "markdown-it-plantuml";

export function markdownToHtml(markdown) {
  const md = new MarkdownIt({
    html: true,
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(str, { language: lang }).value;
        } catch (__) { }
      }
      return '';
    }
  });

  md.use(markdownItPlantuml)
  md.use(require('markdown-it-mathjax3'))

  let result = md.render(markdown);
  return result;
}
