import React from "react";
import { Link } from "gatsby";

import PostMeta from "./post-meta";
import TagsMeta from "./tags-meta";

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
    <Link
      sx={{
        variant: "textStyles.postItemTitle",
      }}
      to={slug}
    >
      {title}
    </Link>
    <PostMeta date={date} timeToRead={timeToRead} />
    <Styled.p
      sx={{
        marginTop: 3,
      }}
    >
      <span>{description}</span>
      <span> </span>
      <Link
        sx={{
          variant: "styles.a",
        }}
        to={slug}
      >
        <span>[Read more]</span>
      </Link>
    </Styled.p>
    {tags && <TagsMeta tags={tags} />}
  </Box>
);

export default PostItem;
