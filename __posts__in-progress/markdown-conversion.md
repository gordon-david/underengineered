---
title: "Convert Markdown to HTML Using Node"
author: "David Gordon"
date: "2021-10-17"
excerpt: "Examples and comparisons of several JavaScript markdown conversion libraries"
tags: ["programming","node", "javascript"]
---

## Convert Markdown Using Markdown-It

```javascript
import MarkdownIt from 'markdown-it'

export function markdownToHtml(markdownContent){
  const markdownIt = new MarkdownIt()
  return markdownIt.render()
}