const size = {
  mobileS: "320px",
  mobileM: "375px",
  mobileL: "425px",
  tablet: "855px",
  laptop: "1024px",
  laptopL: "1440px",
  desktop: "2560px",
};

export const MediaQueries = (key) => {
  return (style) => `@media screen and  (max-width: ${size[key]}){${style}}`;
};
export const MinQuery = (key) => {
  return (style) => `@media screen and  (min-width: ${size[key]}){${style}}`;
};
