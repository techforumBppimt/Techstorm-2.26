import React, { useState, useEffect, useMemo } from 'react';
import { cloudinaryImages } from '../../../config/cloudinary';
import MobileMenu from './MobileMenu/MobileMenu';
import Logo from '../Logo/Logo';
import PillNav from '../PillNav/PillNav';
import Offcanvas from '../Offcanvas/Offcanvas';

const collegelogo = cloudinaryImages.logo.collegelogo;
const IIC_logo = cloudinaryImages.logo.IIC_logo;
const Abhiyantran_logo = cloudinaryImages.logo.Abhiyantran_logo;



const Header = ({ navItems, activeHref }) => {

    const [openCanvas, setOpenCanves] = useState(false);

    const [iconToggle, setIconToggle] = useState(false);
    
    const [isScrolled, setIsScrolled] = useState(false);
    
    // Memoize logos to prevent unnecessary re-renders
    const logos = useMemo(() => (
        <div className="logo">
            <Logo logo={collegelogo}/>
            <Logo logo={IIC_logo} />
            <Logo logo={Abhiyantran_logo}/>
        </div>
    ), []);

    // const heandelOpen = () => {
    //     setOpenCanves(!openCanvas);
    // }

    useEffect(() => {
        let ticking = false;
        let lastScrollY = window.scrollY;
        let scrollTimeout = null;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            
            // Only process if scroll position changed significantly
            if (Math.abs(currentScrollY - lastScrollY) < 1) return;
            lastScrollY = currentScrollY;
            
            // Clear any pending timeout
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
            
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrolled = currentScrollY > 0;
                    if (scrolled !== isScrolled) {
                        setIsScrolled(scrolled);
                        if (scrolled) {
                            document.body.classList.add('header-scrolled');
                        } else {
                            document.body.classList.remove('header-scrolled');
                        }
                    }
                    ticking = false;
                });
                ticking = true;
            }
            
            // Debounce for cleanup
            scrollTimeout = setTimeout(() => {
                ticking = false;
            }, 100);
        };

        // Set initial state immediately
        const initialScrolled = window.scrollY > 0;
        setIsScrolled(initialScrolled);
        if (initialScrolled) {
            document.body.classList.add('header-scrolled');
        }

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.body.classList.remove('header-scrolled');
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
        };
    }, [isScrolled]);


    return (
        <React.Fragment>
            <header className='header-area header-three p-relative'>
                <div 
                    id="header-sticky" 
                    className={`menu-area ${isScrolled ? 'scrolled' : ''}`}
                >
                    <div className="container-fluid pl-50 pr-50">
                        <div className="second-menu">
                            <div className="row align-items-center">
                                <div className="col-xl-1 col-lg-1 col-6">
                                    {logos}
                                </div>
                                <div className="col-6 d-block d-lg-none">

                                    <div className="mobile-toggler text-right">
                                        <button onClick={() => setIconToggle(!iconToggle)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                                            <i className={`${iconToggle ? 'fas fa-times' : 'fa fa-bars'}`}></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <MobileMenu toggleMenu={iconToggle} onClose={setIconToggle} />
                    </div>
                    
                    {/* Integrated PillNav - Desktop Only */}
                    {navItems && (
                        <PillNav
                            items={navItems}
                            activeHref={activeHref}
                            baseColor="#FF6B00"
                            pillColor="#000000"
                            hoveredPillTextColor="#000000"
                            pillTextColor="#ffffff"
                            initialLoadAnimation={true}
                        />
                    )}
                </div>
            </header>
            <Offcanvas onOpne={openCanvas} onClose={setOpenCanves} />

        </React.Fragment>
    )
}

export default Header;
