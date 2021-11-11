import { readdirSync, readFileSync, statSync } from "fs";
import path from "path";
import matter from 'gray-matter'
import { Post, PostFilter, PostJson } from "./Post";
import {CategoryTree, CategoryTreeNode, PostTreeNode, Taxonomy, postSlug, tagList, tagMap, tagName, tags} from "./PostService.types"
export default class PostService {
  postsDirectory: string = path.join(process.cwd(), '_posts')

  setDir(postsDirectory) {
    this.postsDirectory = postsDirectory
    return this
  }

  postSlugs(): string[] {

    let result: Set<string> = new Set()
    let stack = readdirSync(this.postsDirectory).map(e => path.join(this.postsDirectory, e))

    while (stack.length > 0) {
      const current = stack.pop()
      if (statSync(current).isDirectory()) {
        stack = [...stack, ...readdirSync(current).map(e => path.join(current, e))]
        continue
      }
      const currentSlug = path.basename(current).replace(/\.md$/, '').replace(/^.*__/, '')

      if (result.has(currentSlug)) {
        throw `duplicate slug found: ${currentSlug}`
      }
      result.add(currentSlug)
    }

    return Array.from(result)
  }
  postBySlug(slug: string, filter?: PostFilter) {
    let result;
    let stack = readdirSync(this.postsDirectory).map(e => path.join(this.postsDirectory, e))
    let current: string;

    while (stack.length > 0) {
      current = stack.pop()
      if (statSync(current).isDirectory()) {
        stack = [...stack, ...readdirSync(current).map(e => path.join(current, e))]
        continue
      }

      if (path.basename(current).replace(/\.md$/, '').replace(/^.*__/, '') === slug) {

        const category = current
          .replace(this.postsDirectory, '')
          .replace(path.basename(current), '')
          .replace(/^\//, '')
          .replace(/\/$/, '')

        const fileContents = readFileSync(current, 'utf-8')
        const { data, content } = matter(fileContents)
        if (filter === null) {
          return new Post({
            title: (filter.title) ? `${data['title']}` : null,
            author: (filter.author) ? `${data['author']}` : null,
            content: (filter.content) ? content : null,
            date: (filter.date) ? `${data['date']}` : null,
            excerpt: (filter.excerpt) ? `${data['excerpt']}` : null,
            html: (filter.html) ? '' : null,
            slug: (filter.slug) ? slug : null,
            tags: (filter.tags) ? data['tags'] : null,
            uuid: (filter.uuid) ? `${data['uuid']}` : null,
            category: category
          })
        }

        return new Post({
          title: `${data['title']}`,
          author: `${data['author']}`,
          content: `${content}`,
          date: `${data['date']}`,
          excerpt: `${data['excerpt']}`,
          html: '',
          slug: slug,
          tags: data['tags'],
          uuid: `${data['uuid']}`,
          category: category
        })
      }
    }
  }
  allPosts(): Post[] {
    const posts: Post[] = this.postSlugs().map(s => this.postBySlug(s))
    return posts
  }
  tags(): tags {
    let tags: Set<tagName> = new Set()
    let tagMap: tagMap = {}

    let stack = readdirSync(this.postsDirectory).map(e => path.join(this.postsDirectory, e))
    while (stack.length > 0) {
      const current = stack.pop()
      if (statSync(current).isDirectory()) {
        stack = [...stack, ...readdirSync(current).map(e => path.join(current, e))]
        continue
      }
      const fileContents = readFileSync(current, 'utf-8')
      const { data, content } = matter(fileContents)

      if (!data['tags'] || data['tags'].length === 0) {
        if (!tagMap['notTagged']) {
          tagMap['notTagged'] = []
        }
        tagMap['notTagged'].push(path.basename(current).replace(/\.md$/, '').replace(/^.*__/, ''))
      }

      else {

        data['tags'].forEach((tag: tagName) => {
          tags.add(tag)
          if (!tagMap[tag]) {
            tagMap[tag] = []
          }
          tagMap[tag].push(
            path.basename(current).replace(/\.md$/, '').replace(/^.*__/, '')
          )
        })
      }

    }

    return {
      tags: Array.from(tags),
      tagMap
    }

  }
  categoryTree(): CategoryTree {

    function processDirectory(directoryPath: string, directoryName: string, parents: string): CategoryTreeNode {
      const categorySlug = parents ? parents + "/" + directoryName : directoryName
      let result: CategoryTreeNode = {
        children: [],
        name: directoryName,
        type: "category",
        slug: categorySlug
      }

      const contents = readdirSync(directoryPath).sort((a, b) => a.localeCompare(b))

      for (const element of contents) {
        if (statSync(path.join(directoryPath, element)).isDirectory()) {
          const childCategoryTreeNode: CategoryTreeNode = processDirectory(
            path.join(directoryPath, element),
            element,
            categorySlug
          )

          result.children.push(childCategoryTreeNode)
        } else {
          const childPostTreeNode = processFile(path.join(directoryPath, element), categorySlug)

          result.children.push(childPostTreeNode)
        }
      }

      return result
    }

    function processFile(filePath: string, category: string): PostTreeNode {

      const { data, content } = matter(readFileSync(filePath))

      const filename = path.basename(filePath)
      const slug = filename.replace(/\.md$/, '').replace(/^.*__/, '')

      return {
        title: `${data["title"]}`,
        slug,
        category,
        type: "post",
        // uuid: data["uuid"]
      }
    }

    const root = processDirectory(this.postsDirectory, "", "")
    const tags = []
    const tagMap = {}

    return { root }
  }
  taxonomy(): Taxonomy {
    return {
      tags: [],
      tagMap: {},
      categoryTree: this.categoryTree()
    }
  }
}