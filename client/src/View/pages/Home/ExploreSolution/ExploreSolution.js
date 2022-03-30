import React from "react";
import Banner from "./Banner";
import {
  theme,
  SecondaryHeading,
  Container,
  Button,
} from "../../../content/styled-components/Global.styled";
import { SolutionSection } from "../../../content/styled-components/Homepage/ExploreSolution.styled";
import { ThemeProvider } from "styled-components";

export default function ExploreSolution() {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <SolutionSection>
          <div className='document-cta'>
            <SecondaryHeading
              theme={{
                white: "var(--primary-dark-blue)",
                fontSize: "var(--font-size-rem)",
              }}
            >
              Explore solutions
            </SecondaryHeading>
            <p>
              Face your application errors without stress. We have solutions for
              most existing error.
            </p>
            <Button className='btn-padding-top btn-left'>
              Explore Solutions
            </Button>
          </div>
          <Banner />
        </SolutionSection>
      </Container>
    </ThemeProvider>
  );
}
