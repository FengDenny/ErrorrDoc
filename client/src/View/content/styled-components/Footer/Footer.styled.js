import styled from "styled-components";
import { MediaQueries, MinQuery } from "../MediaQueries.styled";
import { theme } from "../Global.styled";

import { motion } from "framer-motion";

export const FooterContent = styled.footer`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;

  height: 400px;
  .footer-logo-copyright {
    flex-grow: 1;
  }
  .footer-nav {
    margin-top: 11rem;
    display: flex;
    flex-wrap: wrap;
    flex-grow: 2;
    ul:nth-child(2) {
      padding-left: 1.5rem;
    }
  }

  .footer-nav a {
    display: flex;
    flex-direction: column;
  }

  p {
    margin-top: 50px;
    color: var(--primary-dark-blue);
    font-size: 1.15rem;
  }

  ${MediaQueries("tablet")`
  flex-wrap: wrap;
`}

  ${MediaQueries("mobileL")`
.footer-logo-copyright p {
  margin-top:7px;
}
`}

  ${MediaQueries("mobileM")`
 padding: 0 3rem;
  .footer-nav {
    margin-top: 1rem;
  }

`}
`;

export const FooterLink = styled.a`
  position: relative;
  font-size: 1rem;
  color: var(--primary-dark-blue);
  display: flex;
  flex-direction: column;
  top: 0.4rem;
  margin-top: 1rem;
  &:hover {
    text-decoration: underline;
  }
`;

export const FooterContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
`;
