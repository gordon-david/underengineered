import Sidebar from "../../components/Sidebar";
import PostService from "../../lib/PostService";

export default function Test({ taxonomy }) {
  return (
    <div>
      <Sidebar taxonomy={taxonomy} />
    </div>
  );
}

export async function getStaticProps(context) {
  const taxonomy = new PostService().taxonomy();
  return {
    props: {
      taxonomy,
    },
  };
}
