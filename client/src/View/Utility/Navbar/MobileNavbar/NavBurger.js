import React, { useState } from "react";
import {
  MobileNav,
  Line,
} from "../../../content/styled-components/Nav/Navbar.styled";

export default function NavBurger({ toggle, setToggle }) {
  return (
    <MobileNav onClick={() => setToggle(!toggle)}>
      <Line open={toggle} />
      <Line open={toggle} />
      <Line open={toggle} />
    </MobileNav>
  );
}
