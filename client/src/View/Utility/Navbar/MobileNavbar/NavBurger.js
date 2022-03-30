import React from "react";
import { MobileNav } from "../../../content/styled-components/Nav/Navbar.styled";

export default function NavBurger({ open, setOpen }) {
  return (
    <MobileNav
      open={open}
      onClick={() => setOpen((open) => !open)}
      animate={{ scale: open ? 0.8 : 1, opacity: open ? 1 : 1 }}
      transition={{ type: "spring", bounce: 0, duration: 0.4 }}
    >
      <div />
      <div />
      <div />
    </MobileNav>
  );
}
