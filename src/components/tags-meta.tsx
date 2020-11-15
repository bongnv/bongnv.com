import React from "react";
import { Link } from "gatsby";

/** @jsx jsx */
import { jsx, Styled } from "theme-ui";

interface StyledTagProps {
  tag: string;
}

const StyledTag: React.FC<StyledTagProps> = ({ tag }) => {
  return (
    <Link
      sx={{
        variant: "styles.a",
      }}
      to={`/tags/${tag}/`}
    >
      {tag}
    </Link>
  );
};

interface TagsMetaProps {
  tags: Array<string>;
}

const TagsMeta: React.FC<TagsMetaProps> = ({ tags = [] }) => (
  <Styled.p
    sx={{
      fontSize: 1,
    }}
  >
    <span>Tagged With: </span>
    <span>
      {tags
        .map<React.ReactNode>((tag) => <StyledTag key={tag} tag={tag} />)
        .reduce((prev, curr) => [prev, ", ", curr])}
    </span>
  </Styled.p>
);

export default TagsMeta;
