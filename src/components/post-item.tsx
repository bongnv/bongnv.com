import React from "react";

import PostMeta from "./post-meta";

/** @jsx jsx */
import { jsx, Box, Styled } from "theme-ui";

interface PostItemProps {
  title: string;
  description: string;
  date: string;
  timeToRead: number;
  slug: string;
  tags?: Array<string>;
}

const PostItem: React.FC<PostItemProps> = ({
  title,
  date,
  description,
  timeToRead,
  slug,
  tags = [],
}) => (
  <Box
    as="article"
    sx={{
      marginBottom: 4,
    }}
  >
    <Styled.a
      sx={{
        variant: "textStyles.postItemTitle",
      }}
      href={slug}
    >
      {title}
    </Styled.a>
    <PostMeta date={date} timeToRead={timeToRead} />
    <Styled.p
      sx={{
        marginTop: 3,
      }}
    >
      <span>{description}</span>
      <span> </span>
      <Styled.a href={slug}>
        <span>[Read more]</span>
      </Styled.a>
    </Styled.p>
    <Styled.p
      sx={{
        fontSize: 1,
      }}
    >
      <span>Tagged With: </span>
      <span>{tags.join(", ")}</span>
    </Styled.p>
  </Box>
);

export default PostItem;
