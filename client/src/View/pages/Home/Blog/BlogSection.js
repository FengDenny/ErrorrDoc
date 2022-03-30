import React from "react";
import {
  theme,
  SecondaryHeading,
  Container,
  Button,
  DiagonalPositive,
} from "../../../content/styled-components/Global.styled";
import { BlogContent } from "../../../content/styled-components/Homepage/Blog.styed";
import { ThemeProvider } from "styled-components";

import BlogImage from "../../../../images/section_blog.png";

export default function BlogSection() {
  return (
    <DiagonalPositive className='diagonal-positive-one'>
      <ThemeProvider theme={theme}>
        <Container>
          <BlogContent>
            <div className='document-cta'>
              <SecondaryHeading
                theme={{
                  width: "var(--width)",
                  white: "var(--white)",
                  fontSize: "2.5rem",
                  marginTop: "15rem",
                }}
              >
                Errors can <span>break</span> an application
              </SecondaryHeading>
              <p>
                When developing new features for your application, you may
                encounter errors. If you do, our blog discusses what errors you
                may encounter building new features.
              </p>
              <Button className='btn-padding-top'>Our Blog</Button>
            </div>
            <figure>
              <img src={BlogImage} alt='Blog illustration' />
            </figure>
          </BlogContent>
        </Container>
      </ThemeProvider>
    </DiagonalPositive>
  );
}
