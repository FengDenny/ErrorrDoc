import React from "react";
import { FaSearch } from "react-icons/fa";
import { theme, Button } from "../../content/styled-components/Global.styled";

export default function Searchbar() {
  return (
    <form>
      <input type='text' placeholder=' Search error' />
      <div className='display-end-btn'>
        <Button>Search</Button>
      </div>
    </form>
  );
}
