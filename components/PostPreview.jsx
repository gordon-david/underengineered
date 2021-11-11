import Link from "next/link";

export default function PostPreview({
  title,
  slug,
  date,
  author,
  excerpt,
  tags = [],
}) {
  return (
    <div className="post-preview-card">
      <Link href={slug ? `/posts/${slug}` : "/error"}>
        <a className="black">
          <h4 className="title">{title}</h4>
          {/* <span className="post-preview-attribution"><small> {author} | <i>{date}</i></small></span> */}
        </a>
      </Link>
      <p className="excerpt">{excerpt ? excerpt : "..."}</p>
      <Link href={`/posts/${slug}`}>
        <a className="read-more"> Read More </a>
      </Link>
      <div>
        {tags.map((tag) => {
          return (
            <Link href={`/posts/tags/${tag}`}>
              <a className="tag">
                <span>
                  <small>{`#${tag} `}</small>
                </span>
              </a>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
