---
title: "Blog Notes"
excerpt: "Design and technical overview of this blog."
date: "2021-11-3"
---

## Document Taxonomy

My aim with this site is to design a flexible taxonomy system that should be easy to move pages from various styles of organization. I want to be able to quickly push a post without worrying about it's organization and later organize the post into categories and tags if I deem it necessary.

**Taxonomy Types:**
- **Tag**: A cross-cutting relation between multiple posts. The Tag to Post relationship is many to many.
  - Tags allow for flexible, cross-collection search and filtering.
- **Categories**: A category is a sorted, tree-like structure.
  - Documents can appear at any level
  - Category levels can declare shared metadata that is inherited by that category level and child levels. That is, if a category should share the same tags they can inherit the tags declared in the shared category metadata.

Example Declaration:
```yaml
title: "Linux Audio Device Driver Programming"
tags: [linux, programming]
categories: {
  shelf: linux,
  book: programming,
  chapter: drivers
}
```

All of the above should be optional, with null-types for Tags (untagged) and Categories (not-categorized).

### Taxonomies Applied to a File System Based Document Repository

There are two common lines of thought regarding file system document repositories:
- Normalized Documents: we keep all documents in one directory and use document meta-data to apply taxonomies and organizational schemas. This has the advantage of flexibility, but may make it difficult to work with filtered subsets of documents directly from the file system (i.e. if I want to update everything in the `Linux/Programming/DeviceDrivers` category, will need to first run a search over all the documents in the directory).
- Nested Directories: we organize documents into file system trees that match their intended nested taxonomies. This could result in a system like the following:

```bash
$ tree _posts/
_posts/
_posts/_categories/
_posts/_categories/Linux
_posts/_categories/Linux/Programming
_posts/_categories/Linus/Programming/Drivers
_posts/_categories/Linus/Programming/Drivers/linux-audio-drivers.md
_posts/_categories/Linux/Tools
_posts/_categories/Linux/Tools/Monitoring
_posts/_categories/Linux/Tools/Monitoring/top.md
_posts/_categories/CRUDAPIs
_posts/_categories/CRUDAPIs/01_overview-requirements.md
_posts/_categories/CRUDAPIs/02_testing.md
_posts/_categories/CRUDAPIs/03_java-spring.md
_posts/_categories/CRUDAPIs/04_aspnet.md
_posts/_categories/CRUDAPIs/05_node.md
```

In addition, there may be data we wish to apply to multiple posts. We could have an inheritance system that allows posts within certain collections and series to share common attributes. Essentially, we would look for  a `_<collection-name>_data.json` file for shared collection data (these can appear at any level of a collection).

## Navigation Data Structures

**Proposed Design:**

```typescript
interface PostListing: {
  url: string,
  title: string,
  category: string // structured as -> "parent/grandparent/etc"
}

interface CategoryListing: {
  url: string,
  name: string,
  posts: PostListing[],
  children: CategoryListing[]
}

interface CategoryMap: {
  notCategorized: PostListing[],
  categories: CategoryListing[]
}

interface TagMap: {
  notTagged: PostListing[],
  tags: {[tag: string]: PostListing[]}
}

interface TaxonomyData: {
  tags: {
    tagMap: TagMap,
    all: string[] // array of all tag names
  },
  categories: {
    categoryMap: CategoryMap
  }
}
```