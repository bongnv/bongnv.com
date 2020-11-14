import React, { useState, useEffect, FC } from "react";

import getFirstHeading from "../utils/get-first-heading";

/** @jsx jsx */
import { jsx, Box, Styled } from "theme-ui";

const WAITING_IN_MS = 100;

interface TOCItem {
  url: string;
  title: string;
  items: Array<{
    url: string;
    title: string;
  }>;
}

interface Heading {
  id: string;
  url: string;
  title: string;
  depth: number;
}

interface TOCProps {
  items: Array<TOCItem>;
}

const handleTOC = (
  headings: Array<Heading>,
  setActiveAnchor: (anchor: string) => void,
): (() => void) => {
  const anchors = headings.map((heading) => {
    const el = document.getElementById(heading.id);

    return {
      anchor: heading.id,
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

const getHeadings = (items: Array<TOCItem>): Array<Heading> => {
  const headings: Array<Heading> = [];

  if (items) {
    items.map((header: TOCItem) => {
      headings.push({
        id: header.url.substring(1),
        title: header.title,
        url: header.url,
        depth: 1,
      });

      if (header.items) {
        header.items.map((sub) => {
          headings.push({
            id: sub.url.substring(1),
            title: sub.title,
            url: sub.url,
            depth: 2,
          });
        });
      }
    });
  }

  return headings;
};

const TOC: FC<TOCProps> = ({ items }) => {
  const [activeAnchor, setActiveAnchor] = useState("");
  const [headings, setHeadings] = useState<Heading[]>([]);

  useEffect(() => {
    const newHeadings = getHeadings(items);
    setHeadings(newHeadings);
    handleTOC(newHeadings, setActiveAnchor);
  }, [items]);

  return (
    <Box
      sx={{
        position: "sticky",
        top: 5,
        fontFamily: "heading",
        borderLeft: "1px solid",
        borderColor: "muted",
        paddingLeft: 3,
        paddingY: 3,
        marginTop: 6,
        marginLeft: 3,
      }}
    >
      <Styled.ul
        sx={{
          color: "text",
          padding: 0,
          marginY: 0,
        }}
      >
        {headings.map((header) => (
          <Styled.li
            key={header.id}
            sx={{
              listStyleType: "none",
              paddingLeft: header.depth > 1 ? 3 : 0,
            }}
          >
            <Styled.a
              href={header.url}
              sx={{
                color: "text",
                textDecoration: "none",
                "&:hover": {
                  color: "secondary",
                },
                fontWeight: header.id === activeAnchor ? "bold" : "body",
                fontSize: header.depth > 1 ? 1 : 2,
              }}
            >
              {header.title}
            </Styled.a>
          </Styled.li>
        ))}
      </Styled.ul>
    </Box>
  );
};

export default TOC;
