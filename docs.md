## Dependencies And Features

gray-matter :: parsing YAML frontmatter

```js
import matter from 'gray-matter'

const { data, content } = matter(fileContents)
```

**build-time libraries**: /lib-build

**client-side libraries**: /lib-client

## Personal Site Notes

## Next.js Target Non-SSR static site

[next docs, dynamic imports with no ssr](https://nextjs.org/docs/advanced-features/dynamic-import#with-no-ssr)


## Latex Math

$\sqrt{{3x-1}+(1+x)^2}$

## Diagrams

@startuml
Bob->Alice:hello
@enduml

## Taxonomy

Tag (post metadata): Post and Tag are a many to many relationship, hardcoded into each post. This gives a flexible set of 'bags' to filter through.

Category (based on tags, sets of tags): based on tags, i.e. 'Software Engineering' might include tags related to databases, software design, specific languages, and development fields like 'web development' or 'backend'.

Collections (post metadata): A Post given a 'collection-name' and an 'index', a collection is a sorted set of posts meant to be read and accessed in a specific order (i.e. "Introduction", "Chapter 1", "Chapter 2" etc.).
- for the purpose of display and navigation, a 'collection' can be considered a category of it's own, or included inside a category.
- Should a collection have a set of tags for itself?