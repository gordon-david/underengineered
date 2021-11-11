import Container from "./Container";
import Navbar from "./Navbar";

export default function Layout({taxonomy, children }) {
  return (
    <Container>
      <Navbar taxonomy={taxonomy}/>
      {children}
      <section className="footer"></section>
    </Container>
  );
}
