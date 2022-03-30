import "./View/content/App.css";
import { GlobalStyles } from "./View/content/styled-components/Global.styled.js";
import { HashRouter as Router, useRoutes } from "react-router-dom";
import Home from "./View/pages/Home/Home";
import Navbar from "./View/Utility/Navbar/Navbar";
import Footer from "./View/Utility/Footer/Footer";
function App() {
  let routes = useRoutes([{ path: "/", element: <Home /> }]);
  return (
    <>
      <GlobalStyles />
      <Navbar />
      <div className='main-container'>
        <main>{routes}</main>
      </div>
      <Footer />
    </>
  );
}

export default App;
