interface IPost { title, content, html, slug, author, date, excerpt, uuid, tags, category }

export interface PostFilter extends Partial<IPost> {
  title?: boolean
  content?: boolean
  html?: boolean
  slug?: boolean
  author?: boolean
  date?: boolean
  excerpt?: boolean
  uuid?: boolean
  tags?: boolean
  category?: boolean
}

export abstract class PostJson implements IPost {
  "title": string
  "content": string
  "html": string
  "slug": string
  "author": string
  "date": string
  "excerpt": string
  "uuid": string
  "tags": string[]
  "type": "post"
  "category": string
}

export class Post implements IPost {
  title: string
  content: string
  html: string
  slug: string
  author: string
  date: string
  excerpt: string
  uuid: string
  tags: string[]
  category: string
  constructor({
    title,
    content,
    slug,
    date,
    excerpt,
    html,
    author,
    uuid,
    tags,
    category
  }: Partial<IPost>) {
    this.title = title ? title : ''
    this.content = content ? content : ''
    this.category = category ? category : ''
    this.html = html ? html : ''
    this.slug = slug ? slug : ''
    this.author = author ? author : ''
    this.date = date ? date : ''
    this.excerpt = excerpt ? excerpt : ''
    this.uuid = uuid ? uuid : ''
    this.tags = tags ? tags : []
  }

  json() {
    let result: any = {}

    if (this.title) {
      result.title = `${this.title}`
    }

    if (this.content) {
      result.content = `${this.content}`
    }

    if (this.slug) {
      result.slug = `${this.slug}`
    }

    if (this.date) {
      result.date = `${this.date}`
    }

    if (this.author) {
      result.author = `${this.author}`
    }

    if (this.excerpt) {
      result.excerpt = `${this.excerpt}`
    }

    if (this.html) {
      result.html = `${this.html}`
    }

    if (this.tags) {
      result.tags = [...this.tags]
    }

    if (this.uuid) {
      result.uuid = this.uuid
    }

    if (this.category) {
      result.category = this.category
    }

    result.type = "post"


    return result
  }
}