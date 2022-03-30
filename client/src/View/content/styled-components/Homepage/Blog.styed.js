import styled from "styled-components";
import { MediaQueries, MinQuery } from "../MediaQueries.styled";
import { theme } from "../Global.styled";

import { motion } from "framer-motion";

export const BlogContent = styled.section`
  position: relative;
  display: flex;
  justify-content: space-between;
  bottom: 6.5rem;
  span {
    font-size: 4rem;
    font-weight: bold;
  }

  p {
    width: ${(props) => props.theme.width};
    color: var(--light-white);
    font-size: 1.1rem;
    padding-top: 0.4rem;
    font-weight: 200;
  }

  img {
    margin-top: 10rem;
  }

  ${MediaQueries("tablet")`
  flex-wrap: wrap;
  justify-content:center;
  img{
    margin-left:1.5rem;
  }
  `};

  ${MediaQueries("mobileL")`
    img{
      width:300px;
      margin-left:0;
      margin-bottom:10px;
      margin-top:5rem;
    }
  `}
`;
