import styled from "styled-components";
import { MediaQueries, MinQuery } from "../MediaQueries.styled";
import { theme } from "../Global.styled";

export const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 60rem;
  background-color: var(--white);
  padding: 5rem 6rem;
  box-shadow: var(--box-shadow);
  border-radius: 7px;
  z-index: 1005;
  transition: all 0.5s;
  width: 30rem;

  .btn-tab {
    border: none;
    font-size: 1.2rem;
    color: inherit;
    cursor: pointer;
    position: relative;
    top: 0.5rem;
    background: inherit;
  }

  .btn-tab:nth-child(2) {
    right: 3rem;
  }

  hr {
    position: relative;
    top: 1rem;
    right: 3rem;
    width: 23rem;
    border: 1px solid var(--hr-line);
  }

  .active::before {
    background-color: var(--secondary-baby-blue);
    border-radius: 4px 4px 0px 0px;
    top: 1.7rem;
    content: "";
    display: block;
    height: 4px;
    left: 0px;
    position: absolute;
    width: 100%;
  }
`;

// Auth Modals Form

export const FormContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: ${(props) => (props.height ? "25rem" : "15rem")};
  h2 {
    position: relative;
    bottom: 5rem;
    color: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .form-secondary {
    position: relative;
    bottom: 3rem;
    font-size: 1.2rem;
    width: 22rem;
    right: 17px;
    color: var(--secondary-gray);
  }
  .form-heading {
    bottom: 4rem !important;
    color: inherit;
  }
  .form-heading-three {
    display: flex;
    position: relative;
    left: 3rem;
    font-weight: 200;
    color: var(--secondary-gray);
    justify-content: center;
  }
  .form-heading-three button {
    border: none;
    background: inherit;
    font-size: 1rem;
    cursor: pointer;
    color: var(--secondary-baby-blue);
    padding: 0 5px;
  }
  .form-heading-three button::before {
    content: "";
    position: relative;
    display: block;
    top: 1.2rem;
    width: 100%;
    height: 2px;
    border-radius: 4px 4px 0px 0px;
    background-color: var(--secondary-baby-blue);
  }

  .form-heading-three button:hover,
  .form-heading-three button:hover::before {
    color: var(--secondary-baby-blue-hover);
  }
  .form-active > div {
    position: relative;
    left: 0rem !important;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 1rem;
  right: 1rem;
  .btn-reset-link {
    position: absolute;
    bottom: 2.2rem;
    left: 18.5rem;
    border: none;
    background: none;
    color: var(--secondary-baby-blue);
    width: 8rem;
    cursor: pointer;
  }

  .btn-reset-link:hover {
    color: var(--secondary-baby-blue-hover);
  }

  label {
    position: relative;
    left: 3rem;
    color: inherit;
    font-size: 1.1rem;
  }
  input {
    position: relative;
    border: 2px solid var(--secondary-gray);
    border-radius: 5px;
    width: 23rem;
    height: 2.5rem;
    top: 0.5rem;
    left: 48px;
    padding-left: 5px;
  }
  input::placeholder {
    position: relative;
    left: 0.2rem;
  }
  div {
    position: relative;
    left: 1rem;
    padding-top: 1.5rem;
  }

  p {
    position: relative;
    left: 3rem;
    width: 24rem;
    color: var(--secondary-gray);
  }

  a {
    text-decoration: underline;
    color: var(--secondary-baby-blue);
    padding-left: 4px;
  }
`;
