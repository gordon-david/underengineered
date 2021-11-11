import Layout from "../../../components/Layout";
import PostPreview from "../../../components/PostPreview";
import PostService from "../../../lib/PostService"

export default function FilteredTagPage({ taxonomy, tag, posts }) {
  return (
    <Layout taxonomy={taxonomy}>
      <h1>{tag}</h1>
      <ul className="post-list">
        {posts.map((post) => (
          <li key={`${post.title}${post.date}`}>
            <PostPreview
              title={post.title}
              slug={post.slug}
              date={post.date}
              excerpt={post.excerpt}
              author={post.author}
              tags={post.tags}
            />
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export async function getStaticPaths() {
  const postService = new PostService()
  const tagMap = postService.tags().tagMap;

  return {
    paths: Object.keys(tagMap).map((tag) => ({
      params: {
        slug: tag,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postService = new PostService()
  const taxonomy = postService.taxonomy()
  const tagMap = postService.tags().tagMap;
  const allPosts = postService.allPosts();
  const posts = allPosts.filter((post) => {
    let found = false;
    post.tags.forEach((tag) => {
      if (tag === params.slug) {
        found = true;
      }
    });
    return found;
  });

  return {
    props: {
      postSlugs: tagMap[params.slug],
      posts: posts.map((post) => post.json()),
      tag: params.slug,
      taxonomy
    },
  };
}
