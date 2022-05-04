import { useRef } from "react";
import "./View/content/css/App.css";
import { GlobalStyles } from "./View/content/styled-components/Global.styled.js";
import { HashRouter as Router, useRoutes } from "react-router-dom";
import Home from "./View/pages/Home/Home";
import Navbar from "./View/Utility/Navbar/Navbar";
import Footer from "./View/Utility/Footer/Footer";
function App() {
  let routes = useRoutes([{ path: "/", element: <Home /> }]);
  const overlay = useRef(null);
  const setOverlay = () => {
    overlay.current.classList.add("overlay");
  };

  return (
    <div>
      <GlobalStyles />
      <Navbar setOverlay={setOverlay} />
      <div className='main-container'>
        <main>{routes}</main>
        <div ref={overlay} />
      </div>
      <Footer />
    </div>
  );
}

export default App;
