import React, { FC } from "react";

/** @jsx jsx */
import { jsx, Styled } from "theme-ui";

interface PostMetaProps {
  date: string;
  timeToRead: number;
}

const PostMeta: FC<PostMetaProps> = ({ date, timeToRead }: PostMetaProps) => (
  <Styled.p
    sx={{
      marginTop: 1,
      variant: "textStyles.subtitle",
    }}
  >
    {`Posted on ${date} - `}
    <Styled.strong>{timeToRead} min read</Styled.strong>
  </Styled.p>
);

export default PostMeta;
