import React from "react";
import { SecondaryHeading } from "../../../content/styled-components/Global.styled";
import { Banner } from "../../../content/styled-components/Homepage/ExploreSolution.styled";
export default function CreateBanner() {
  const toDate = new Date("2021-03-27").toLocaleString();

  var bannerInit = [];
  for (let i = 1; i <= 4; i++) {
    bannerInit.push(
      <Banner>
        <SecondaryHeading
          theme={{
            marginTop: "0",
            white: "var(--white)",
            fontSize: "1rem",
            width: "400px",
          }}
        >
          Objects are not valid as a React child, If you meant to render a
          collection of children use an array instead.
        </SecondaryHeading>
        <div className='display-flex'>
          <p className='tag'>Object</p>
          <p className='tag'>Array</p>
        </div>
        <div className='date-absolute'>
          <p className='date'>{toDate}</p>
        </div>
      </Banner>
    );
  }
  return <div className='banner-margin'>{bannerInit}</div>;
}
