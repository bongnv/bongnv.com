import React from "react";

import StyledLink from "./styled-link";

/** @jsx jsx */
import { jsx, Styled } from "theme-ui";

interface StyledTagProps {
  tag: string;
}

const StyledTag: React.FC<StyledTagProps> = ({ tag }) => {
  return <StyledLink to={`/tags/${tag}/`}>{tag}</StyledLink>;
};

interface TagsMetaProps {
  tags: Array<string>;
}

const TagsMeta: React.FC<TagsMetaProps> = ({ tags = [] }) => (
  <Styled.p
    sx={{
      fontSize: 1,
      marginY: 1,
    }}
  >
    <span>Tagged with: </span>
    <span>
      {tags
        .map<React.ReactNode>((tag) => <StyledTag key={tag} tag={tag} />)
        .reduce((prev, curr) => [prev, ", ", curr])}
    </span>
  </Styled.p>
);

export default TagsMeta;
