import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';

// import 'pixel-retroui/dist/fonts.css'; // Commented out - path doesn't exist in pixel-retroui package
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/animate.min.css';
import './assets/css/dripicons.css';
import './assets/css/magnific-popup.css';
import './assets/fontawesome/css/all.min.css';
import './assets/font-flaticon/flaticon.css';
import './assets/css/slick.css';
import './assets/css/meanmenu.css';
import './assets/css/default.css';
import './assets/css/style.css';
import './assets/css/responsive.css';
import './components/Utilities/Button/Button8bit.css';
// import 'nes.css/css/nes.min.css'; // Removed because module not found
import './assets/css/nes-custom.css';
import './assets/css/scroll-animations.css';
import './assets/css/techstorm-theme.css';
import './assets/css/font-display-optimizations.css';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);