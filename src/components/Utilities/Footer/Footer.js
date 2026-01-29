import { Link } from "react-router-dom";

import Logo from "../Logo/Logo";
import logo from '../../../assets/img/logo/f_logo.png';

const Footer = () => {
    return (
        <footer className="footer-bg footer-p">
            <div className="footer-top pt-70">
                <div className="container">
                    <div className="row justify-content-between">
                        <div className="col-xl-4 col-lg-4 col-sm-6">
                            <div className="footer-widget mb-30">
                                <div className="f-widget-title mb-20">
                                    <Link to={'/'}>
                                        <Logo logo={logo} />
                                    </Link>
                                </div>
                                <div className="footer-link">{'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore'}</div>
                                <div className="f-contact mt-20">
                                    <ul>
                                        <li>
                                            <i className="icon fal fa-map-marker-alt"></i>
                                            <span>{'Address :66 Broklyn Street,  United States of America'}</span>
                                        </li>
                                        <li>
                                            <i className="icon far fa-clock"></i>
                                            <span>
                                                Phone : 
                                                <Link to={'#callto:+12345678900'}>
                                                    {'+123 456 78900'}
                                                    </Link>
                                                    </span>
                                        </li>
                                        <li>
                                            <i className="icon dripicons-mail"></i>
                                            <span>
                                                {'Email :'} 
                                                <Link to={'mailto:info@examplecom'}>
                                                    {'info@example.com'}
                                                </Link>
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-2 col-lg-2 col-sm-6">
                            <div className="footer-widget mb-30">
                                <div className="f-widget-title">
                                    <h2>{'Our Links'}</h2>
                                </div>
                                <div className="footer-link">
                                    <ul>
                                        <li><Link to={'/'}>{'Home'}</Link>
                                        </li>
                                        <li><Link to={'/about'}> {'About Us'}</Link>
                                        </li>
                                        <li><Link to={'/service'}> {'Services'} </Link>
                                        </li>
                                        <li><Link to={'/contact'}> {'Contact Us'}</Link>
                                        </li>
                                        <li><Link to={'/blog'}>{'Blog'} </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-2 col-lg-2 col-sm-6">
                            <div className="footer-widget mb-30">
                                <div className="f-widget-title">
                                    <h2>{'Our Services'}</h2>
                                </div>
                                <div className="footer-link">
                                    <ul>
                                        <li><Link to={'/faq'}>{'FAQ'}</Link>
                                        </li>
                                        <li><Link to={'#'}>{'Support'}</Link>
                                        </li>
                                        <li><Link to={'#'}>{'About Story'}</Link>
                                        </li>
                                        <li><Link to={'#'}>{'Privercy'}</Link>
                                        </li>
                                        <li><Link to={'#'}>{'Term & Conditions'}</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-3 col-sm-6">
                            <div className="footer-widget mb-30">
                                <div className="f-widget-title">
                                    <h2>{'Follow Us'}</h2>
                                </div>
                                <div className="footer-social  mt-30"> <a href="#"><i className="fab fa-facebook-f"></i></a>
                                    <Link to={'#'}><i className="fab fa-twitter"></i></Link>
                                    <Link to={'#'}><i className="fab fa-instagram"></i></Link>
                                </div>
                            </div>
                            <div className="footer-widget mb-30">
                                <div className="f-widget-title">
                                    <h2>{'Map'}</h2>
                                </div>
                                <div className="map-f">
                                    <div className="map" id="map"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="copyright-wrap">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            {'Copyright © 2021'} <span>{'eoorox'}</span> {'All Rights Reserved.'}
                        </div>
                        <div className="col-lg-6 text-right text-xl-right"></div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;