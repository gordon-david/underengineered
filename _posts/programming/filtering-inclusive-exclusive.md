---
title: Filtering An Array Inclusively and Exclusively
date: "2021-10-29"
excerpt: Filtering by a single condition is simple, but extending that logic to multiple conditions can be tricky...
tags: ["computer science", "programming"]
---

This article explores filtering a list wherein elements are either included or excluded based on certain conditions present. We will use **Blog Posts** and **Tags** as our domain entities for this discussion. Our goal is to filter the set of all blog posts by the tags associated with them, inclusively and exclusively.

By inclusively, I mean "include posts that contain tag X" and by exclusively I mean "exclude posts that contain tag Y".

## Filter Chaining

Given a set of filters, $T_o, T_a, T_e, P_t$, (where o is inclusive OR, a is AND, and e is EXCLUDE, and $P_t$ is the set of tags in a particular post), a typical chain of filters would be:

$$INCLUDE \iff [ \exists{x}(x \epsilon T_o \land x \epsilon P_t) \land \forall{y}(y \epsilon T_a \land y \epsilon P_t) \land \nexists{z}(z \epsilon T_e \land z \epsilon p_t) ]$$

This is a chain of AND conditions determining whether to include a particular post. We can apply some operations on these conditions in some cases where finding an 'EXCLUDE' match allows for better short circuiting. The logic itself is also particular and domain specific. A given domain problem will likely require altering the above conditions.

This is a basic matching problem, where as soon as any of the above statements is false we can concur that the given post should be filtered out of the result set and excluded. A worst case implementation will yield $O (tp)$ (where t is the total number of tags in the system and p is the number of posts). In this case, we constantly find matches only after iterating through every tag in the system. 

A better implementation will have short circuits that break from these tag iterations as soon as a meaningful condition is found, and give a time complexity closer to what I think is the average and lower bound: $\Omega (p)$. The toughest match is the inclusive AND condition, as it requires looping through all tags in the post and asserting that all matches are present.

## Typescript Implementation

This potential solution involves making an assumption regarding the result set, then finding counter-examples to the assumption. Each counter-example is exclusive to any other counter-example (i.e. we should not be able to apply multiple counter-examples during a single function execution).

Here, INCLUSIVE OR and EXCLUSIVE filters are simply `set`s of tags -- giving quick matching and element uniqueness defining by the data structure.
```ts
function getFilteredPosts(
  inclusiveSet: Set, 
  exclusiveSet: Set, 
  allPosts: Post[]
){

  // we assume no filters exist then check
  // for counter-examples
  let filteredPosts = allPosts;

  // no inclusive filters and some exclusive filters
  if (inclusiveSet.size === 0 && exclusiveSet.size > 0) {
    filteredPosts = filteredPosts.filter((post) => {
      return (
        post.tags.filter((postTag) => exclusiveSet.has(postTag)).length === 0
      );
    });
  } 
  
  // some inclusive filters and no exclusive filters
  else if (inclusiveSet.size > 0 && exclusiveSet.size === 0) {
    filteredPosts = filteredPosts.filter((post) => {
      return (
        post.tags.filter((postTag) => inclusiveSet.has(postTag)).length > 0
      );
    });
  } 
  
  // some inclusive filters and some exclusive filters
  else if (inclusiveSet.size > 0 && exclusiveSet.size > 0) {
    filteredPosts = filteredPosts.filter((post) => {
      const include =
        post.tags.filter((postTag) => inclusiveSet.has(postTag)).length > 0;
      const exclude =
        post.tags.filter((postTag = inclusiveSet.has(postTag))).length > 0;

      return include && !exclude;
    });
  }

  return filteredPosts;
}
```