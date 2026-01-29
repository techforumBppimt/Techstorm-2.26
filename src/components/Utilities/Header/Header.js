import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import MobileMenu from './MobileMenu/MobileMenu';
import Logo from '../Logo/Logo';
import logo from '../../../assets/img/logo/logo.png';
import toggolIcon from '../../../assets/img/bg/toggle-menu.png';
import Offcanvas from '../Offcanvas/Offcanvas';



const Header = () => {

    const [openCanvas, setOpenCanves] = useState(false);

    const [iconToggle, setIconToggle] = useState(false);

    const heandelOpen = () => {
        setOpenCanves(!openCanvas);
    }


    return (
        <React.Fragment>
            <header className='header-area header-three p-relative'>
                <div id="header-sticky" className="menu-area">
                    <div className="container-fluid pl-50 pr-50">
                        <div className="second-menu">
                            <div className="row align-items-center">
                                <div className="col-xl-1 col-lg-1 col-6">
                                    <div className="logo">
                                        <Logo logo={logo} />
                                    </div>
                                </div>
                                <div className="col-xl-2 col-lg-2 text-right d-none d-lg-block mt-30 mb-30 ml-auto">
                                    <a onClick={heandelOpen} className="menu-tigger">
                                        <img src={toggolIcon} alt="Toggle Icon" />
                                    </a>
                                </div>
                                <div className="col-6 d-block d-lg-none">

                                    <div className="mobile-toggler text-right">
                                        <a onClick={() => setIconToggle(!iconToggle)}>
                                            <i className={`${iconToggle ? 'fas fa-times' : 'fa fa-bars'}`}></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <MobileMenu toggleMenu={iconToggle} onClose={setIconToggle} />
                    </div>
                </div>
            </header>
            <Offcanvas onOpne={openCanvas} onClose={setOpenCanves} />

        </React.Fragment>
    )
}

export default Header;
