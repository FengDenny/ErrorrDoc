import styled from "styled-components";
import { MediaQueries } from "../MediaQueries.styled";
import { theme } from "../Global.styled";

//Navbar
export const NavbarStyled = styled.nav`
  padding: ${(props) => props.theme.padding};
  flex-direction: ${(props) => props.theme.flexDirection};
  justify-content: ${(props) => props.theme.justifyContent};
  display: flex;
  margin-top: 15px;
`;
export const Nav = styled.nav`
  position: relative;
`;

export const NavLogo = styled.a`
  font-family: var(--primary-font-krona);
  font-size: ${(props) => props.theme.fontLarge};
  color: var(--primary-dark-blue);
  position: relative;
  top: 5px;
  cursor: ${(props) => props.theme.cursor};
`;

export const NavUL = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: center;
  position: absolute;
  right: 45%;
  @media only screen and (max-width: 855px) {
    display: ${(props) => (props.open ? "block" : "none")};
    flex-direction: column;
    margin-top: 2rem;
    right: 2rem;
  }
`;

export const NavLink = styled.a`
  font-size: var(--small);
  font-family: var(--secondary-font-domine);
  color: var(--primary-dark-blue);
  //top right/left bottom
  padding: 0 20px 0;
  cursor: pointer;

  :hover {
    text-decoration: underline;
    color: var(--primary-dark-blue);
    tansition: all 0.2s ease-in-out;
    -webkit-transition-duration: 0.2s; /* Safari */
    transition-duration: 0.2s;
  }
`;

export const NavLi = styled.li`
  position: relative;
  top: 15px;
  ${MediaQueries("tablet")`
  padding: 3px;
  `};
`;

export const MobileNav = styled.button`
  width: 50px;
  border: none;
  background: transparent;
  cursor: pointer;

  @media (min-width: 856px) {
    display: none;
  }
`;

export const NavButton = styled.button`
  position: relative;
  background: var(--secondary-baby-blue);
  color: #fff;
  border: 1px solid var(--secondary-baby-blue);
  border-radius: 5px;
  font-size: 0.9rem;
  width: 120px;
  height: 35px;
  cursor: pointer;
  font-weight: bold;
  :hover {
    background: var(--bg-hover);
    transition-duration: 0.3s;
    box-shadow: var(--box-shadow);
  }

  @media only screen and (max-width: 855px) {
    display: ${(props) => (props.open ? "block" : "none")};
    margin-top: 20rem;
    left: 0.4rem;
    align-self: flex-start;
  }
`;

export const Line = styled.span`
  display: block;
  border-radius: 50px;
  width: 25px;
  height: 3px;
  margin: 5px;
  background-color: var(--primary-dark-blue);
  transition: width 0.4s ease-in-out;
  :nth-child(2) {
    width: ${(props) => (props.open ? "20px" : "25px")};
  }
`;

export const Overlay = styled.div`
  position: absolute;
  height: ${(props) => (props.open ? "91vh" : 0)};
  width: 100vw;
  background: var(--bg-color);
  z-index: 1000;
  transition: height 0.4s ease-in-out;
  top: 4rem;
  @media (min-width: 856px) {
    display: none;
  }
`;

export const OverlayMenu = styled.ul`
  list-style: none;
  position: absolute;
  left: 50%;
  top: 23%;
  transform: translate(-50%, -50%);

  li {
    opacity: ${(props) => (props.open ? 1 : 0)};
    font-size: 25px;
    margin: 50px 0px;
    transition: opacity 0.4s ease-in-out;
  }

  li:nth-child(2) {
    margin: 50px 0px;
  }
`;
