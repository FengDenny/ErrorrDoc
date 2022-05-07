import { useState, useRef } from "react";
import "./View/content/css/App.css";
import { GlobalStyles } from "./View/content/styled-components/Global.styled.js";
import { HashRouter as Router, useRoutes } from "react-router-dom";
import Home from "./View/pages/Home/Home";
import Navbar from "./View/Utility/Navbar/Navbar";
import Footer from "./View/Utility/Footer/Footer";
import { AccountContext } from "./View/context/accountContext";
import { contextValue } from "./View/Utility/Modal/switchModal";
import {
  setOverlay,
  removeOverlay,
  setActiveClass,
  removeActiveClass,
} from "./View/Utility/Modal/ModalHelper";

function App() {
  let routes = useRoutes([{ path: "/", element: <Home /> }]);
  const [showModal, setShowModal] = useState(false);
  const [active, setActive] = useState("signup");
  const [toggle, setToggle] = useState(false);
  const overlay = useRef(null);
  const signInActive = useRef(null);
  const signUpActive = useRef(null);

  return (
    <AccountContext.Provider value={contextValue}>
      <GlobalStyles />
      <Navbar
        setOverlay={setOverlay}
        removeOverlay={removeOverlay}
        active={active}
        setActive={setActive}
        showModal={showModal}
        setShowModal={setShowModal}
        toggle={toggle}
        setToggle={setToggle}
        overlay={overlay}
        setActiveClass={setActiveClass}
        removeActiveClass={removeActiveClass}
        signInActive={signInActive}
        signUpActive={signUpActive}
      />
      <div className='main-container'>
        <main>{routes}</main>
        <div
          ref={overlay}
          onClick={() => {
            setShowModal(!showModal);
            removeOverlay(overlay);
          }}
        />
      </div>
      <Footer />
    </AccountContext.Provider>
  );
}

export default App;
