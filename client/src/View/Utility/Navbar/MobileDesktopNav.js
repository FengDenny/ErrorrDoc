import React, { useState } from "react";
import { theme, Button } from "../../content/styled-components/Global.styled";
import {
  NavLi,
  NavUL,
  NavLink,
  NavButton,
  Overlay,
  OverlayMenu,
} from "../../content/styled-components/Nav/Navbar.styled";
import { ThemeProvider } from "styled-components";
import ModalContainer from "../Modal/Modal";
import { contextValue } from "../Modal/switchModal";
import NavBurger from "./MobileNavbar/NavBurger";
import { AccountContext } from "../../context/accountContext";

export default function Nav({ setOverlay }) {
  const [showModal, setShowModal] = useState(false);
  const [active, setActive] = useState("signup");
  const [toggle, setToggle] = useState(false);

  return (
    <AccountContext.Provider value={contextValue}>
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
        <NavButton
          nav
          onClick={() => {
            setShowModal(!showModal);
            setActive("signup");
            setOverlay();
          }}
        >
          Sign Up Free
        </NavButton>
        <NavBurger toggle={toggle} setToggle={setToggle} />
        <Overlay open={toggle}>
          <OverlayMenu open={toggle}>
            <NavUL open={toggle}>
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
            <NavButton
              nav
              onClick={() => {
                setShowModal(!showModal);
                setActive("signup");
                setOverlay();
              }}
              open={toggle}
            >
              Sign Up Free
            </NavButton>
          </OverlayMenu>
        </Overlay>
        {showModal && (
          <ModalContainer
            showModal={showModal}
            setShowModal={setShowModal}
            active={active}
            setActive={setActive}
          />
        )}
      </ThemeProvider>
    </AccountContext.Provider>
  );
}
