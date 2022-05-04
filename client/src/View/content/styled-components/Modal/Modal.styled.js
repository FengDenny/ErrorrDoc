import styled from "styled-components";
import { MediaQueries, MinQuery } from "../MediaQueries.styled";
import { theme } from "../Global.styled";

export const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 60rem;
  background-color: #f3f3f3;
  padding: 5rem 6rem;
  box-shadow: var(--box-shadow);
  z-index: 1005;
  transition: all 0.5s;
`;
