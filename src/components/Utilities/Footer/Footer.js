import { Link } from "react-router-dom";
import { cloudinaryImages } from '../../../config/cloudinary';
import logo from '../../../assets/img/logo/iplogo.png';

const footerbg = cloudinaryImages.root.footerbg;

const Footer = () => {
    return (
        <footer className="footer-bg footer-p" style={{
            backgroundImage: `url(${footerbg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            position: 'relative'
        }}>
            {/* Overlay for reduced opacity */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                zIndex: 0
            }}></div>
            
            <div className="footer-top pt-70" style={{ position: 'relative', zIndex: 1, paddingBottom: '40px' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                            <div className="footer-widget mb-30">
                                <div className="f-widget-title mb-20">
                                    <img src={logo} alt="TechStorm Logo" style={{ maxWidth: '350px', height: 'auto' }} />
                                </div>
                                <div className="footer-link">{'TechStorm 2026 - Play the Past, Build the Future. The flagship technical fest celebrating retro arcade culture and modern innovation.'}</div>
                                <div className="f-contact mt-20">
                                    <ul>
                                        <li>
                                            <i className="icon fal fa-map-marker-alt"></i>
                                            <span>{'Address : 137, VIP Rd, Mali Bagan, Poodar Vihar, Rajarhat, Kolkata, West Bengal 700052'}</span>
                                        </li>
                                        <li>
                                            <i className="icon far fa-clock"></i>
                                            <span>
                                                Phone : 
                                                <Link to={'#callto:+91XXXXXXXXXX'}>
                                                    {'+91 9038903850'}
                                                    </Link>
                                                    </span>
                                        </li>
                                        <li>
                                            <i className="icon dripicons-mail"></i>
                                            <span>
                                                {'Email :'} 
                                                <Link to={'mailto:techstorm@college.edu'}>
                                                    {'techstorm@college.edu'}
                                                </Link>
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 col-6">
                            <div className="footer-widget mb-30 footer-links-section">
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
                        <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 col-6">
                            <div className="footer-widget mb-30 footer-links-section">
                                <div className="f-widget-title">
                                    <h2>{'Events'}</h2>
                                </div>
                                <div className="footer-link">
                                    <ul>
                                        <li><Link to={'#'}>{'Coding Arena'}</Link>
                                        </li>
                                        <li><Link to={'#'}>{'Robo League'}</Link>
                                        </li>
                                        <li><Link to={'#'}>{'Gaming Zone'}</Link>
                                        </li>
                                        <li><Link to={'/faq'}>{'FAQ'}</Link>
                                        </li>
                                        <li><Link to={'#'}>{'Rules & Guidelines'}</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
                            <div className="footer-widget mb-30 footer-links-section">
                                <div className="f-widget-title">
                                    <h2>{'Follow Us'}</h2>
                                </div>
                                <div className="footer-social-nes mt-30">
                                    <Link to={'https://www.facebook.com'} target="_blank" rel="noopener noreferrer" className="nes-social-icon">
                                        <i className="nes-icon facebook is-medium"></i>
                                    </Link>
                                    <Link to={'https://twitter.com'} target="_blank" rel="noopener noreferrer" className="nes-social-icon">
                                        <i className="nes-icon twitter is-medium"></i>
                                    </Link>
                                    <Link to={'https://www.instagram.com'} target="_blank" rel="noopener noreferrer" className="nes-social-icon">
                                        <i className="nes-icon instagram is-medium"></i>
                                    </Link>
                                    <Link to={'https://www.linkedin.com'} target="_blank" rel="noopener noreferrer" className="nes-social-icon">
                                        <i className="nes-icon linkedin is-medium"></i>
                                    </Link>
                                    <Link to={'mailto:techstorm@college.edu'} className="nes-social-icon">
                                        <i className="nes-icon gmail is-medium"></i>
                                    </Link>
                                    <Link to={'https://wa.me/919038903850'} target="_blank" rel="noopener noreferrer" className="nes-social-icon">
                                        <i className="nes-icon whatsapp is-medium"></i>
                                    </Link>
                                </div>
                            </div>
                            <div className="footer-widget mb-30" style={{ marginBottom: '50px' }}>
                                <div className="f-widget-title">
                                    <h2>{'Map'}</h2>
                                </div>
                                <div className="map-f-container" style={{ marginBottom: '20px' }}>
                                    <div className="map-f" style={{
                                        border: '4px solid #ffc010',
                                        padding: '0',
                                        background: 'rgba(26, 14, 34, 0.9)',
                                        position: 'relative',
                                        marginBottom: '20px'
                                    }}>
                                        <iframe 
                                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3682.8287896869886!2d88.47249007516844!3d22.63474097945438!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f89fa702ccbc2b%3A0x9e94acde66c43bb9!2sBP%20Poddar%20Institute%20of%20Management%20%26%20Technology!5e0!3m2!1sen!2sin!4v1738522844123!5m2!1sen!2sin"
                                            width="100%" 
                                            height="200" 
                                            style={{ border: 0, display: 'block' }} 
                                            allowFullScreen="" 
                                            loading="lazy" 
                                            referrerPolicy="no-referrer-when-downgrade"
                                            title="BPPIMT Location"
                                        ></iframe>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="copyright-wrap" style={{ position: 'relative', zIndex: 1 }}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-12 col-md-12">
                            <div className="copyright-content">
                                <div>{'Copyright © 2026'} <span>{'TechStorm | BPPIMT'}</span></div>
                                <div>{'All Rights Reserved.'}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;