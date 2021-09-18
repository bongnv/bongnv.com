import React, { FC } from "react";

/** @jsx jsx */
import { jsx, Themed } from "theme-ui";

interface PostMetaProps {
  date: string;
  timeToRead: number;
}

const PostMeta: FC<PostMetaProps> = ({ date, timeToRead }: PostMetaProps) => (
  <Themed.p
    sx={{
      marginTop: 1,
      variant: "textStyles.subtitle",
    }}
  >
    {`Posted on ${date} - `}
    <Themed.strong>{timeToRead} min read</Themed.strong>
  </Themed.p>
);

export default PostMeta;
