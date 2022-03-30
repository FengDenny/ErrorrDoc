import React from "react";
import {
  theme,
  HeadingPrimary,
  Container,
} from "../../../content/styled-components/Global.styled";
import { Hero } from "../../../content/styled-components/Homepage/Hero.styled";
import { ThemeProvider } from "styled-components";
import HeroImage from "../../../../images/hero_one.png";
import Search from "../../../Utility/Search/Searchbar";
export default function HeroSection() {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Hero>
          <div>
            <HeadingPrimary theme={{ fontLarge: "60px" }}>
              <span>Solve</span> existing errors one step at a time.
            </HeadingPrimary>
            <p>
              Having to debug errors can be stressful and can be time consuming.
              With ErrorrDoc, we analyze the potential problem, and help create
              a viable solution within a few minutes.
            </p>
            <Search />
          </div>
          <figure>
            <img src={HeroImage} alt='hero' />
          </figure>
        </Hero>
      </Container>
    </ThemeProvider>
  );
}
