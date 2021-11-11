export type postSlug = string
export type tagList = string[]
export type tagName = string
export type tagMap = { [tagName: tagName]: postSlug[] }

export interface PostTreeNode {
  slug: string
  type: string
  title: string
  category: string
  // uuid: string
}

export interface CategoryTreeNode {
  slug: string
  type: string
  name: string
  children: (PostTreeNode | CategoryTreeNode)[]
}

export interface CategoryTree {
  root: CategoryTreeNode
}

export interface Taxonomy {
  tags: tagList
  tagMap: tagMap
  categoryTree: CategoryTree
}

export interface tags {
  tags: tagList,
  tagMap: tagMap
}