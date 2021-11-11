import PostService from "../lib/PostService"
import { expect, describe, it } from '@jest/globals'
import fs from 'fs'
import path from 'path'
import { Post } from "../lib/Post"

const postFixturesDir = path.join(process.cwd(), '__tests__', 'post-fixtures')

const postsPath = path.join(postFixturesDir, '00', '_posts')

describe('PostService', () => {


  describe('categoryTree', () => {
    it('matches expected output', () => {
      const fixtureDir = path.join(process.cwd(), '__tests__', 'post-fixtures', '00', '_posts')
      const expected =
        JSON.parse(fs.readFileSync(path.join(fixtureDir, '..', 'expected.json')))["categoryTree"]
      const result = new PostService().setDir(fixtureDir).categoryTree(fixtureDir)

      expect(result).toMatchObject(expected)
    })
  })

  describe('tags', () => {
    it('matches expected output', () => {
      const postsPath = path.join(postFixturesDir, '00', '_posts')
      const expected = {
        "tags": [
          "linux",
          "software"
        ],
        "tagMap": {
          "linux": [
            "linux-software-post",
            "linux-post",
          ],
          "software": [
            "software-post",
            "linux-software-post"
          ],
          "notTagged": [
            "blank"
          ]
        }
      }

      const result = new PostService().setDir(postsPath).tags()

      expect(result.tags).toEqual(expect.arrayContaining(expected['tags']))
      expect(result.tagMap['linux']).toEqual(expect.arrayContaining(expected.tagMap.linux))
      expect(result.tagMap['software']).toEqual(expect.arrayContaining(expected.tagMap.software))
      expect(result.tagMap['notTagged']).toEqual(expect.arrayContaining(expected.tagMap.notTagged))

    })
  })

  describe('postSlugs', () => {
    it('gathers all slugs into a list', () => {
      const postsPath = path.join(postFixturesDir, '00', '_posts')
      const expected = ['linux-software-post', 'linux-post', 'software-post', 'blank']
      const result = new PostService().setDir(postsPath).postSlugs()

      expect(result.length).toEqual(expected.length)
      expect(result).toEqual(expect.arrayContaining(expected))
    })
    it('error is thrown if duplicate slugs are found', () => {

      let errorThrown = false
      try {
        new PostService().setDir(path.join(postFixturesDir, '01', '_posts')).postSlugs()
      } catch (error) {
        errorThrown = true
      }
      expect(errorThrown).toBe(true)
    })
  })

  describe('postBySlug', () => {
    it('processes blank file', () => {
      const filePath = path.join(postFixturesDir, '00', '_posts')
      const result = new PostService().setDir(filePath).postBySlug('blank', { title: true, slug: true, tags: true })
      const expected = {
        title: "Blank",
        slug: "blank",
        tags: [],
        category: ""
      }
      expect(result).toMatchObject(expected)
    })

    it('retrieves an entire Post object with the given slug', () => {
      const postsPath = path.join(postFixturesDir, '00', '_posts')
      const expected = new Post({
        title: 'Blank',
        content: "\nThis is a blank post with no tags and no categories.",
        tags: [],
        uuid: "831706f3-2a0f-451e-ac4a-ef2f3ee9a58f",
        category: ""
      })

      const result = new PostService().setDir(postsPath).postBySlug('blank')

      expect(result.title).toEqual(expected.title)
      expect(result.content).toEqual(expected.content)
      expect(result.tags).toEqual(expected.tags)
      expect(result.uuid).toEqual(expected.uuid)
      expect(result.category).toEqual(expected.category)
    })
    it('retrieves a post with appropriate category set', () => {
      const expected = 'linux/software'
      const result = new PostService().setDir(postsPath).postBySlug('linux-software-post').category

      expect(result).toEqual(expected)
    })
  })

  describe("allPosts", () => {
    it('collects all posts', () => {
      const expected = {
        numPosts: 4
      }
      const result = new PostService().setDir(postsPath).allPosts()

      expect(result.length).toEqual(expected.numPosts)
    })
  })
})
