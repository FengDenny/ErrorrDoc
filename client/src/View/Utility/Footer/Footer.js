import React from "react";
import {
  theme,
  SecondaryHeading,
  Container,
} from "../../content/styled-components/Global.styled";
import {
  FooterContent,
  FooterContainer,
  FooterLink,
} from "../../content/styled-components/Footer/Footer.styled.js";
import { ThemeProvider } from "styled-components";
export default function Footer() {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <FooterContent>
          <div className='footer-logo-copyright'>
            <SecondaryHeading
              theme={{
                white: "var(--primary-dark-blue)",
                fontSize: "2.5rem",
                marginTop: "10rem",
              }}
            >
              ErrorrDoc
            </SecondaryHeading>
            <p>© 2022 ErrorrDoc.</p>
          </div>
          <div className='footer-nav'>
            <ul>
              <SecondaryHeading
                theme={{
                  white: "var(--primary-dark-blue)",
                  fontSize: "1.2rem",
                  // marginTop: "10rem",
                }}
              >
                Company
              </SecondaryHeading>
              <li>
                <FooterLink href='/about'>About</FooterLink>
              </li>
              <li>
                <FooterLink href='/blog'>Blog</FooterLink>
              </li>
            </ul>
            <ul>
              <SecondaryHeading
                theme={{
                  white: "var(--primary-dark-blue)",
                  fontSize: "1.2rem",
                  // marginTop: "10rem",
                }}
              >
                Resources
              </SecondaryHeading>
              <li>
                <FooterLink href='/contact'>Contact</FooterLink>
              </li>
              <li>
                <FooterLink href='/documentation'>Documentation</FooterLink>
              </li>
            </ul>
          </div>{" "}
        </FooterContent>
      </Container>
    </ThemeProvider>
  );
}
