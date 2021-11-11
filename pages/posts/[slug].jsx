import { useRouter } from "next/dist/client/router";
import ErrorPage from "next/error";
// import { getAllPosts, getPostBySlug } from "../../lib/api";
import PostService from "../../lib/PostService";
import { markdownToHtml } from "../../lib/markdownToHtml";
import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/Layout";

export default function Post({ post, taxonomy }) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <Layout taxonomy={taxonomy}>
        <article>
          <header>
            <h1>{post.title}</h1>
            <div>
              {post.tags.map((tag) => (
                <Link href={`/posts/tags/${tag}`}>
                  <a>
                    <small>{`#${tag} `}</small>
                  </a>
                </Link>
              ))}
            </div>
          </header>
          <div dangerouslySetInnerHTML={{ __html: post.html }}></div>
        </article>
      </Layout>
    </>
  );
}

export async function getStaticProps({ params }) {
  const postService = new PostService()
  const post = postService.postBySlug(params.slug);
  post.html = markdownToHtml(post.content || "");
  const taxonomy = postService.taxonomy()

  return {
    props: {
      post: post.json(),
      taxonomy
    },
  };
}

export async function getStaticPaths() {
  const postService = new PostService()
  const slugs = postService.postSlugs();

  return {
    paths: slugs.map((slug) => {
      return {
        params: {
          slug: slug,
        },
      };
    }),
    fallback: false,
  };
}
