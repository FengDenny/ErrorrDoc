import React from "react";
import { theme, Button } from "../../content/styled-components/Global.styled";
import {
  NavLi,
  NavUL,
  NavLink,
} from "../../content/styled-components/Nav/Navbar.styled";
import { ThemeProvider } from "styled-components";

export default function NavLinks() {
  return (
    <ThemeProvider theme={theme}>
      <NavUL>
        <NavLi>
          <NavLink href='/docs'>Docs</NavLink>
        </NavLi>
        <NavLi>
          <NavLink href='/errors'>Errors</NavLink>
        </NavLi>
        <NavLi>
          <NavLink href='/blog'>Blog</NavLink>
        </NavLi>
      </NavUL>
      <Button nav>Sign Up Free</Button>
    </ThemeProvider>
  );
}
