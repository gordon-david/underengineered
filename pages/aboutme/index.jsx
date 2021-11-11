import AboutMe from "../../components/AboutMe";
import Contact from "../../components/Contact";
import Layout from "../../components/Layout";
import PostService from "../../lib/PostService";

export default function index({taxonomy}) {
  return (
    <Layout taxonomy={taxonomy}>
      <AboutMe />
      <Contact />
    </Layout>
  );
}

export async function getStaticProps(){
  const taxonomy = new PostService().taxonomy()
  return {
    props: {
      taxonomy
    }
  }
}