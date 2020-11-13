import React, { FC } from "react";
import { Menu, X } from "react-feather";

/** @jsx jsx */
import { jsx, IconButton } from "theme-ui";

interface MenuBtnProps {
  closed: boolean;
  onClick: () => void;
}

const MenuBtn: FC<MenuBtnProps> = ({ closed, onClick }) => (
  <IconButton
    title="Menu"
    aria-label="Toggle Menu"
    size={24}
    sx={{
      padding: "0px",
      "&:focus": {
        outline: "none",
      },
      "&:hover": {
        color: "secondary",
      },
      display: ["block", "none"],
    }}
    onClick={onClick}
  >
    {closed ? <Menu /> : <X />}
  </IconButton>
);

export default MenuBtn;
