import React, { useState, useEffect, useRef } from "react";
import {
  theme,
  Container,
} from "../../content/styled-components/Global.styled";
import {
  NavbarStyled,
  NavLogo,
} from "../../content/styled-components/Nav/Navbar.styled";
import { ThemeProvider } from "styled-components";
import { useNavigate } from "react-router-dom";
import NavBurger from "./MobileNavbar/NavBurger";
import BurgerMenu from "./MobileNavbar/BurgerMenu";
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const closeNav = () => !setOpen();
  const node = useRef();
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <NavbarStyled ref={node}>
          <NavLogo
            theme={{ fontLarge: "30px", cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            ErrorrDoc
          </NavLogo>
          <NavBurger open={open} setOpen={setOpen} />
          <BurgerMenu open={open} closeNav={closeNav} />
        </NavbarStyled>
      </Container>
    </ThemeProvider>
  );
}
