import React, { useState, useEffect, FC } from "react";

import getFirstHeading from "../utils/get-first-heading";

/** @jsx jsx */
import { jsx, Box, Styled } from "theme-ui";

const WAITING_IN_MS = 100;

interface Heading {
  url: string;
  title: string;
  items: Array<{
    url: string;
    title: string;
  }>;
}

interface TOCProps {
  items: Array<Heading>;
}

const handleTOC = (
  headings: Array<Heading>,
  setActiveAnchor: (anchor: string) => void,
): (() => void) => {
  const anchors = headings.map((heading) => {
    const el = document.getElementById(heading.url);

    return {
      anchor: heading.url,
      offsetTop: el ? el.offsetTop : -1,
    };
  });

  let busy = false;
  const handleScroll = (): void => {
    if (!busy) {
      busy = true;
      setTimeout(() => {
        setActiveAnchor(
          getFirstHeading(window.scrollY, window.innerHeight, anchors),
        );
        busy = false;
      }, WAITING_IN_MS);
    }
  };

  window.addEventListener("scroll", handleScroll);

  return (): void => {
    window.removeEventListener("scroll", handleScroll);
  };
};

const TOC: FC<TOCProps> = ({ items }) => {
  const [activeAnchor, setActiveAnchor] = useState("");
  useEffect(() => handleTOC(items, setActiveAnchor), [items]);

  return (
    <Box
      sx={{
        position: "sticky",
        top: 5,
        fontFamily: "heading",
        borderLeft: "1px solid",
        borderBlockColor: "muted",
        paddingLeft: 3,
        marginTop: 6,
        marginLeft: 3,
      }}
    >
      <Styled.h4
        sx={{
          marginBottom: 2,
          paddingBottom: 2,
          borderBottom: "1px solid",
          borderBottomColor: "muted",
        }}
      >
        ON THIS PAGE
      </Styled.h4>
      <Styled.ul>
        {items.map((heading, index) => (
          <Styled.li key={heading.url}>
            <Styled.a href={heading.url}>{heading.title}</Styled.a>
          </Styled.li>
        ))}
      </Styled.ul>
    </Box>
  );
};

export default TOC;
