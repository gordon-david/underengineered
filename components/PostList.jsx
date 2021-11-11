import { useState } from "react";
import PostPreview from "./PostPreview";

export default function PostList({ allPosts, tagMap }) {
  const [chosenTags, setChosenTags] = useState(new Set());

  /** Filter posts by chosen tags
   * @returns a list of PostPreview elements
   */
  const getFilteredPostPreviews = () => {
    let includedPosts = allPosts;

    if (chosenTags.size > 0) {
      includedPosts = includedPosts.filter((post) => {
        const found = post.tags.filter((postTag) =>
          chosenTags.has(postTag)
        ).length;
        return found === chosenTags.size;
      });
    }

    return includedPosts.map((post) => (
      <PostPreview
        title={post.title}
        excerpt={post.excerpt}
        tags={post.tags}
        slug={post.slug}
      />
    ));
  };

  const handleTagClick = (tag) => {
    if (chosenTags.has(tag)) {
      const newInclusive = new Set([...chosenTags]);
      newInclusive.delete(tag);
      setChosenTags(newInclusive);
      return;
    }

    setChosenTags(new Set([...chosenTags, tag]));
  };

  return (
    <div>
      <div>
        {Object.keys(tagMap).map((tag) => (
          <button
            className={`filter ${chosenTags.has(tag) ? "inclusive" : ""}`}
            onClick={() => handleTagClick(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
      <ul className="post-list">{getFilteredPostPreviews()}</ul>
    </div>
  );
}
