import Layout from "../../components/Layout";
import Link from "next/link";
import PostService from "../../lib/PostService";

export default function Tags({ tagMap, taxonomy }) {
  return (
    <Layout taxonomy={taxonomy}>
      <h1>Post Tags:</h1>
      <div>
        {Object.keys(tagMap).map((tag) => {
          const label = (
            <li>
              <b>{`${tag}`} :</b>
            </li>
          );
          const list = tagMap[tag].map((item) => (
            <li>
              <Link href={`/posts/${item}`}>
                <a>{`${item}`}</a>
              </Link>
            </li>
          ));
          return [label, <ul> {list} </ul>];
        })}
      </div>
    </Layout>
  );
}

export async function getStaticProps(context) {
  const taxonomy = new PostService().taxonomy();

  return {
    props: { tagMap: taxonomy.tagMap, taxonomy },
  };
}
