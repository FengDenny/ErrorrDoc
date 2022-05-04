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
import MobileDesktopNav from "./MobileDesktopNav";

export default function Navbar({ setOverlay }) {
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <NavbarStyled>
          <NavLogo
            theme={{ fontLarge: "30px", cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            ErrorrDoc
          </NavLogo>
          <MobileDesktopNav setOverlay={setOverlay} />
        </NavbarStyled>
      </Container>
    </ThemeProvider>
  );
}
