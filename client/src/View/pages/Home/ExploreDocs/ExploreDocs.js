import React from "react";
import {
  theme,
  SecondaryHeading,
  Container,
  Diagonal,
  Button,
} from "../../../content/styled-components/Global.styled";
import { DocsContent } from "../../../content/styled-components/Homepage/ExploreDocs.styled";
import { ThemeProvider } from "styled-components";
import DocImage from "../../../../images/section_2.png";

export default function ExploreDocs() {
  return (
    <Diagonal className='diagonal-one'>
      <ThemeProvider theme={theme}>
        <Container>
          <DocsContent>
            <div className='document-cta'>
              <SecondaryHeading>
                Errors can occur <span>anywhere</span> at any given time
              </SecondaryHeading>
              <p>
                Often times, errors can be quite duanting. With the right
                documentations and guidances, facing errors will be quite the
                opposite.
              </p>
              <Button className='btn-padding-top'>Explore Docs</Button>
            </div>
            <figure>
              <img src={DocImage} alt='Doc illustration' />
            </figure>
          </DocsContent>
        </Container>
      </ThemeProvider>
    </Diagonal>
  );
}
