import styled from "styled-components";
import { MediaQueries, MinQuery } from "../MediaQueries.styled";
import { theme } from "../Global.styled";

export const DocsContent = styled.div`
  position: relative;
  bottom: 3rem;
  display: flex;
  justify-content: space-between;
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
  button {
    width: 150px;
    font-weight: bold;
  }

  img {
    margin-top: 1.5rem;
  }

  ${MediaQueries("tablet")`
  flex-wrap: wrap;
  justify-content:center;
  img{
    margin-left:1.5rem;
  }
  `}

  ${MediaQueries("mobileL")`
    img{
      width:300px;
      margin-left:0;
      margin-bottom:10px;
      margin-top:5rem;
    }
  `}
`;
