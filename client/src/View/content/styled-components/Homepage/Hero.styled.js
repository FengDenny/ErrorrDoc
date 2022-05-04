import styled from "styled-components";
import { MediaQueries, MinQuery } from "../MediaQueries.styled";
import { theme } from "../Global.styled";

import { motion } from "framer-motion";

export const Hero = styled(motion.section)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: calc(10% - 50px);
  img {
    padding-right: 20px;
    max-width: 400px;
    height: 400px;
    margin-top: calc(30% - 50px);
  }

  p {
    max-width: 600px;
    font-size: calc(10% + 18px);
    color: var(--secondary-gray);
    line-height: 1.8rem;
    margin-left: 0.5rem;
  }
  input {
    border: 1px solid #fff;
    border-radius: 5px;
    width: calc(90% - 30px);
    height: 50px;
    margin-left: 0.5rem;
    box-shadow: var(--box-shadow);
    margin-top: 0.3rem;
    padding-left: 0.5rem;
    font-size: 1rem;
    &:focus {
      outline: none;
      border: 2px solid var(--primary-dark-blue);
    }

    ::placeholder,
    ::-webkit-input-placeholder {
      font-size: 1rem;
    }
    :-ms-input-placeholder {
      font-size: 1rem;
    }
  }

  ${MediaQueries("tablet")`
  
  flex-wrap:wrap;
  margin-left:2rem;
  margin-top: calc(0% - 1px);
  `}

  ${MediaQueries("mobileL")`
  h1{
    font-size:2.5rem;
  }
  p{
    
    font-size: calc(10% + 13px);
  }
  input{
    width:23rem;
  }
  img{
    height:350px;
    max-width: 350px;
  }
  `}
`;
