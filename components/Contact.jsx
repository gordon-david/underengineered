import GithubIconLink from "./GithubIconLink";
import LinkedInIconLink from "./LinkedInIconLink";

export default function Contact() {
  return (
    <section className="contact">
      <div className="contact-head">
        <h2>Contact Me</h2>
        <div>
          <div className="contact-links">
            <GithubIconLink />
            <LinkedInIconLink />
          </div>
          <span>
            <b>Email:</b> d.phi.gordon@gmail.com
          </span>
        </div>
      </div>
    </section>
  );
}
