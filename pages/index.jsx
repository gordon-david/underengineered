import Head from "next/head";
// import { collectAllTags, getAllPosts } from "../lib/api";
import PostService from "../lib/PostService";
import PostPreview from "../components/PostPreview";
import Layout from "../components/Layout";
import PostList from "../components/PostList";

export default function Home({ allPosts, tagMap, taxonomy }) {
  return (
    <>
      <Head>
        <title>Blog</title>
        <meta
          name="description"
          content="A collection of programming articles by David Gordon"
        />
      </Head>
      <Layout taxonomy={taxonomy}>
        <h1>Under Engineering 101:</h1>
        <p>
          Welcome to my tech blog! This is a site for my personal musings,
          research notes, and project write-ups.
        </p>
        <h2> All Posts </h2>
        <PostList allPosts={allPosts} tagMap={tagMap} />
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const postService = new PostService()
  const allPosts = postService.allPosts();
  const tags = postService.tags();
  const taxonomy = postService.taxonomy()
  return {
    props: {
      allPosts: allPosts.map((e) => e.json()),
      tagMap: tags.tagMap,
      taxonomy
    },
  };
}
