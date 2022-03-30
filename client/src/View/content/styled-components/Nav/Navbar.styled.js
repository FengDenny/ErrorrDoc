import styled from "styled-components";
import { MediaQueries } from "../MediaQueries.styled";
import { theme } from "../Global.styled";

import { motion } from "framer-motion";

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
  ${MediaQueries("tablet")`
flex-direction: column;
margin-top:2rem;
`};
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

export const MobileNav = styled(motion.button)`
  position: relative;
  top: 0;
  left: 10rem;
  visibility: hidden;
  width: 2rem;
  height: 2em;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;
  &:focus {
    outline: none;
  }
  div {
    margin: 0.4rem;
    width: 2rem;
    height: 0.25rem;
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;
    :first-child {
      transform: ${({ open }) => (open ? "rotate(45deg)" : "rotate(0)")};
      transition: "all 1s";
      background: var(--primary-dark-blue);
    }
    :nth-child(2) {
      opacity: ${({ open }) => (open ? "0" : "1")};
      transform: ${({ open }) => (open ? "translateX(20px)" : "translateX(0)")};
      transition: "all 1s";
      background: var(--primary-dark-blue);
    }
    :nth-child(3) {
      transform: ${({ open }) => (open ? "rotate(-45deg)" : "rotate(0)")};
      transition: "all 1s";
      background: var(--primary-dark-blue);
    }
  }
  ${MediaQueries("tablet")`
  visibility: visible;
  `}
`;

export const MobileMenu = styled(motion.div)`
  position: relative;
  right: 5px;
  background: #fff;
  width: 200px;
  height: 200px;
  border-radius: 8px;
  box-shadow: var(--box-shadow);
`;

export const NavDesktop = styled.div`
  ${MediaQueries("tablet")`
 visibility: hidden
`}
`;
