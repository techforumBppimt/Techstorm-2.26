import React from "react";
import { Link } from "react-router-dom";

const Offcanvas = ({ onOpne, onClose }) => {

    return (
        <React.Fragment>
            <div className={`offcanvas-menu ${onOpne ? 'active' : ''}`}>
                <span className="menu-close" onClick={() => onClose(!onOpne)}>
                    <i className="fas fa-times"></i>
                </span>
                <form role="search" id="searchform" className="searchform">
                    <input type="text" name="s" id="search" value="" placeholder="Search" />
                    <button>
                        <i className="fa fa-search"></i>
                    </button>
                </form>
                <div id="cssmenu3" className="menu-one-page-menu-container">
                    <ul id="menu-one-page-menu-2" className="menu">
                        <li className="menu-item menu-item-type-custom menu-item-object-custom">
                            <Link to={'/'}>{'Home'}</Link>
                        </li>
                        <li className="menu-item menu-item-type-custom menu-item-object-custom">
                            <Link to={'/about'}>{'About Us'}</Link>
                        </li>
                        <li className="menu-item menu-item-type-custom menu-item-object-custom">
                            <Link to={'/service'}>{'Services'}</Link>
                        </li>
                        <li className="menu-item menu-item-type-custom menu-item-object-custom">
                            <Link to={'/team'}>{'Team'}</Link>
                        </li>
                        <li className="menu-item menu-item-type-custom menu-item-object-custom">
                            <Link to={'/gallery'}>{'Gallery Study'}</Link>
                        </li>
                        <li className="menu-item menu-item-type-custom menu-item-object-custom">
                            <Link to={'/blog'}>{'Blog'}</Link>
                        </li>
                        <li className="menu-item menu-item-type-custom menu-item-object-custom">
                            <Link to={'/contact'}>{'Contact'}</Link>
                        </li>
                    </ul>
                </div>
                <div id="cssmenu2" className="menu-one-page-menu-container">
                    <ul id="menu-one-page-menu-1" className="menu">
                        <li className="menu-item menu-item-type-custom menu-item-object-custom">
                            <Link to={'#'}><span>{'+8 12 3456897'}</span></Link>
                        </li>
                        <li className="menu-item menu-item-type-custom menu-item-object-custom">
                            <Link to={'#'}><span>{'info@example.com'}</span></Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className={`offcanvas-overly ${onOpne ? 'active' : ''}`} 
            onClick={() => onClose(!onOpne)}></div>
        </React.Fragment>
    );

}

export default Offcanvas;