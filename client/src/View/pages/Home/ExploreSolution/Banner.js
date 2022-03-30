import React from "react";
import { ThemeProvider } from "styled-components";
import CreateBanner from "./CreateBanner";
import { theme } from "../../../content/styled-components/Global.styled";

export default function Banner() {
  return <ThemeProvider theme={theme}>{CreateBanner()}</ThemeProvider>;
}
