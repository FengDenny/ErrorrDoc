import styled, { createGlobalStyle, keyframes } from "styled-components";
import { MediaQueries } from "./MediaQueries.styled";
export const GlobalStyles = createGlobalStyle`
// css reset
*, *::before, *::after{
    box-sizing:border-box;
    padding:0;
    margin:0;
}

a{
    text-decoration:none;

}
li{
    list-style:none;
}
html{
    scroll-behavior:smooth;
}
body {

background:var(--bg-color);
}



:root{
    //  tan(5°) / 2
    --tan-five-degree: 0.04374;
    --primary-font-krona: 'Krona One', sans-serif;
    --primary-dark-blue:#2F2E41;
    --secondary-baby-blue:#4B71D4;
    --secondary-font-domine:'Domine', serif;
    --secondary-gray: #797979;
    --white: #fff;
    --light-white: #E5E5E5;
    --bg-color:#FAFBF8;
    --small: 20px;
    --medium: 25px;
    --large: 65px;
    --font-size-rem: 2.5rem;
    --border-radius: 5px;
    --bg-hover: #5376D1;
    --box-shadow:0.1em 0.3em 5px 0 rgba(0,0,0,0.2);
    --bg-gradient: linear-gradient(90deg, rgba(47,46,65,1) 0%, rgba(75,113,212,1) 100%);
    --width: 355px;
    --full-width: 100vw;
    --skew-angle: -5deg;
    --skew-angle-positive: 5deg;
    --skew-padding: calc(var(--full-width) * var(--tan-five-degree));
}
`;

export const theme = {
  headingPrimary: "primary-font-krona",
  fontMedium: "var(--medium)",
  fontLarge: "var(--large)",
  flexDirection: "row",
  justifyContent: "space-between",
  padding: "10px",
  marginTop: "9rem",
  width: "var(--width)",
  white: " var(--white)",
  fontSize: "var(--font-size-rem)",
};

export const HeadingPrimary = styled.h1`
  position: relative;
  font-family: var(--primary-font-krona);
  font-size: ${(props) => props.theme.fontLarge};
  color: var(--primary-dark-blue);
  max-width: 700px;
  margin-top: calc(10% + 50px);
  span {
    color: var(--secondary-baby-blue);
  }
`;

export const SecondaryHeading = styled.h2`
  color: ${(props) => props.theme.white};
  font-size: ${(props) => props.theme.fontSize};
  width: ${(props) => props.theme.width};
  margin-top: ${(props) => props.theme.marginTop};
`;

export const Button = styled.button`
  position: relative;
  background: var(--secondary-baby-blue);
  color: #fff;
  border: 1px solid var(--secondary-baby-blue);
  border-radius: 5px;
  font-size: 0.9rem;
  width: 120px;
  height: 35px;
  cursor: pointer;
  font-weight: bold;
  :hover {
    background: var(--bg-hover);
    transition-duration: 0.3s;
    box-shadow: var(--box-shadow);
  }
`;

// Layout
export const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

export const Diagonal = styled.section`
  position: relative;
  padding: var(--skew-padding) 0;
  margin-top: 5rem;
  border-radius: 7px;
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transform: skewY(var(--skew-angle));
  }
`;

export const DiagonalPositive = styled(Diagonal)`
  &:before {
    content: "";
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transform: skewY(var(--skew-angle-positive));
  }
`;
