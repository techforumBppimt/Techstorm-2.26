import React from 'react';
import { BrowserRouter as Router, Route, Switch, useLocation } from 'react-router-dom';

import Header from './Utilities/Header/Header';
import PillNav from './Utilities/PillNav/PillNav';
import logo from '../assets/img/logo/logo.png';
import Home from './Pages/Home/HomeMain/HomeMain';
import HomeTwo from './Pages/Home/HomeTwo/HomeTwo';
import HomeThree from './Pages/Home/HomeThree/HomeThree';
import Footer from './Utilities/Footer/Footer';
import AboutUs from './Pages/AboutUs/AboutUs';
import Gallery from './Pages/Gallery/Gallery';
import Teams from './Pages/Team/Team';
import Faqs from './Pages/Faq/Faq';
import Games from './Pages/Games/Games';
import Matchese from './Pages/Matchese/Matchese';
import MatcheseDetails from './Pages/MatcheseDetails/MatcheseDetails';
import LiveStreaming from './Pages/LiveStreaming/LiveStreaming';
import Error404 from './Pages/404';
import BlogPost from './Pages/Blog/Blog';
import ContactUs from './Pages/ContactUs/ContactUs';
import SinglePost from './Pages/SinglePost/SinglePost';

const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Pages', href: '#', submenu: [
        { label: 'Gallery', href: '/gallery' },
        { label: 'Team', href: '/team' },
        { label: 'FAQ', href: '/faq' },
        { label: 'Our Game', href: '/game' },
        { label: 'Matches', href: '/matchese' },
        { label: 'Match Details', href: '/matchese-details' },
        { label: 'Live Streaming', href: '/live-streaming' },
        { label: 'Blog Details', href: '/single-post' },
        { label: '404 Page', href: '/404' }
    ]},
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' }
];

const AppContent = () => {
  const location = useLocation();
  
  return (
    <div className="App">

      {/* Header */}
      <Header />

      {/* PillNav - Desktop Only */}
      <PillNav
          logo={logo}
          logoAlt="EOOROX Game Studio"
          items={navItems}
          activeHref={location.pathname}
          baseColor="#ffc010"
          pillColor="#1a0e22"
          hoveredPillTextColor="#ffc010"
          pillTextColor="#ffffff"
          initialLoadAnimation={true}
      />

      <Switch>

        <Route exact path="/" component={Home} />
        <Route exact path="/home-two" component={HomeTwo} />
        <Route exact path="/home-three" component={HomeThree} />
        <Route exact path="/about" component={AboutUs} />
        <Route exact path="/gallery" component={Gallery} />
        <Route exact path="/team" component={Teams} />
        <Route exact path="/faq" component={Faqs} />
        <Route exact path="/game" component={Games} />
        <Route exact path="/matchese" component={Matchese} />
        <Route exact path="/matchese-details" component={MatcheseDetails} />
        <Route exact path="/live-streaming" component={LiveStreaming} />
        <Route exact path="/404" component={Error404} />
        <Route exact path="/blog" component={BlogPost} />
        <Route exact path="/single-post" component={SinglePost} />
        <Route exact path="/contact" component={ContactUs} />

      </Switch>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
