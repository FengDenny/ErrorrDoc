import styled from "styled-components";
import { MediaQueries, MinQuery } from "../MediaQueries.styled";
import { theme } from "../Global.styled";

import { motion } from "framer-motion";

export const SolutionSection = styled.section`
  position: relative;
  margin-top: 6rem;
  display: flex;
  flex-direction: column;
  p {
    width: var(--width);
    color: var(--secondary-gray);
    font-size: 1.1rem;
    padding-top: 0.4rem;
    font-weight: 200;
  }
  button {
    --btn-width: 150px;
    width: var(--btn-width);
  }
  ${MediaQueries("tablet")`
  
  flex-wrap: wrap;
 .document-cta h2{
   margin-right:67px;
 }

 .btn-left{
   align-self:center;
   left:-6.5rem
 }
`}
`;

export const Banner = styled.figure`
  position: relative;
  background: var(--primary-dark-blue);
  margin-top: 3rem;
  width: calc(100% / 2);
  height: 60px;
  padding: 0.4rem;
  display: flex;
  justify-content: space-between;
  font-weight: 200;
  border-radius: 5px;
  box-shadow: var(--box-shadow);
  .tag {
    position: relative;
    bottom: 0.4rem;
    right: 0;
    width: 3.5rem;
    height: 25px;
    font-size: 1rem;
    color: var(--primary-dark-blue);
    border: 1px solid var(---white);
    border-radius: 0.5rem;
    background: var(--light-white);
    text-align: center;
    padding: 3px 0;
    margin-top: 0.2rem;

    :nth-child(2) {
      left: 3px;
    }
  }

  .date-absolute {
    position: absolute;
    right: 0;
    top: 2.2rem;
    width: auto;
  }

  .date {
    color: var(--light-white);
    padding: 0 10px;
    display: inline;
    font-size: 0.9rem;
  }

  //   Banner layout
  :nth-child(odd) {
    position: relative;
    margin: 0 auto;
  }

  :nth-child(even) {
    position: relative;
    bottom: 2rem;
  }

  ${MediaQueries("tablet")`
   h2{
      font-size:0.75rem;
      width:203px;
    }

    :nth-child(odd) {
      position: relative;
      margin: 1rem auto;
      width:23rem;
    }
  
    :nth-child(even) {
      position: relative;
      bottom: 2rem;
      width:23rem;

    }

  `}
`;
