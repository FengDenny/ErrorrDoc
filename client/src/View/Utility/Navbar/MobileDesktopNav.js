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

export default function Nav({
  setOverlay,
  removeOverlay,
  active,
  setActive,
  showModal,
  setShowModal,
  toggle,
  setToggle,
  overlay,
  setActiveClass,
  removeActiveClass,
  signInActive,
  signUpActive,
}) {
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
            setActive("signin");
            setOverlay(overlay);
          }}
        >
          Sign In
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
                setActive("signin");
                setOverlay(overlay);
              }}
              open={toggle}
            >
              Sign In
            </NavButton>
          </OverlayMenu>
        </Overlay>
        {showModal && (
          <ModalContainer
            showModal={showModal}
            setShowModal={setShowModal}
            active={active}
            setActive={setActive}
            removeOverlay={removeOverlay}
            overlay={overlay}
            signInActive={signInActive}
            setActiveClass={setActiveClass}
            removeActiveClass={removeActiveClass}
            signUpActive={signUpActive}
          />
        )}
      </ThemeProvider>
    </AccountContext.Provider>
  );
}
