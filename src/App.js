import {React} from "react";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./components/Home";
import AdventureDetail from "./components/AdventureDetail";
import Articles from "./components/Articles";
import ArticleDetail from "./components/ArticleDetail";
import About from "./components/About";
import {getAuthorHost, getProtocol, getService} from "./utils/fetchData";
import logo from "./images/tesco-logo-2017.svg";
import "./App.scss";
// import { useSparkleAppUrl } from "./hooks";

const NavMenu = () => (
  <nav>
    <ul className="menu">
      <li><a href={`/${window.location.search}`}>Recipes</a></li>
      <li><a href={`/articles${window.location.search}`}>How to</a></li>
      <li><a href={`/aboutus${window.location.search}`}>Meals</a></li>
      <li><a href={`/${window.location.search}`}>Seasonal</a></li>
      <li><a href={`/articles${window.location.search}`}>Ingredients</a></li>
      <li><a href={`/aboutus${window.location.search}`}>Christmas</a></li>
    </ul>
  </nav>
);

const Header = () => {
  // const sparkleAppUrl = useSparkleAppUrl();
  return (
    <header className="header">
        {/*<a href={sparkleAppUrl}><img src={logo} className="logo" alt="WKND Logo" /></a>*/}
        <img src={logo} className="logo" alt="Tesco Logo" />
      <NavMenu />
      <button className="dark">Sign in</button>
    </header>
  );
};

const Footer = () => (
  <footer className="footer">
    <img src={logo} className="logo" alt="Tesco Logo" />
    <NavMenu />
    <small>Copyright &copy; 2024 Adobe. All rights reserved. Tesco and associated are fully copyright by Tesco limited. Built for demo purposes only</small>
  </footer>
);

function App() {

  return (
    <HelmetProvider>
      <div className="App">
        <Helmet>
          <meta name="urn:adobe:aue:system:aemconnection" content={`${getProtocol()}:${getAuthorHost()}`}/>
          <meta name="urn:adobe:aue:config:extensions" content="https://47679-workflowextension.adobeio-static.net"/>
            { getService() && <meta name="urn:adobe:aue:config:service" content={getService()}/> }
        </Helmet>
        <Router>
          <Header />
          <hr/>
          <main>
            <Routes>
              <Route path="/adventure/:slug" element={<AdventureDetail />} />
              <Route path="/" element={<Home />} />
              <Route path="/articles" element={<Articles />} />
              <Route path="/articles/article/:slug" element={<ArticleDetail />} />
              <Route path="/aboutus" element={<About />} />
            </Routes>
          </main>
        </Router>
        <hr/>
        <Footer/>
      </div>
    </HelmetProvider>
  );
}

export default App;
