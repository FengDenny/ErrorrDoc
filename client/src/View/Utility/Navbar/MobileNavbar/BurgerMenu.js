import React from "react";
import Nav from "../Nav";
import { AnimatePresence } from "framer-motion";
import {
  MobileMenu,
  NavbarStyled,
  NavDesktop,
} from "../../../content/styled-components/Nav/Navbar.styled";

export default function BurgerMenu({ open = false, closeNav }) {
  return (
    <AnimatePresence>
      {open ? (
        <MobileMenu
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          transition={{ type: "spring", bounce: 0, duration: 0.4 }}
        >
          <Nav onClick={() => closeNav()} />
        </MobileMenu>
      ) : (
        <NavDesktop>
          <Nav />
        </NavDesktop>
      )}
    </AnimatePresence>
  );
}
