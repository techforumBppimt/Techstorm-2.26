import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Collapse } from 'react-bootstrap';
import './MobileMenu.js';

class MobileMenu extends Component {

    state = {
        isOpen: false,
        isOpenTwo: false,
    }

    isDropDownOpenOne = () => {
        this.setState({
            isOpen: !this.state.isOpen,
            isOpenTwo: false
        })
    }

    isDropDownOpenTwo = () => {
        this.setState({
            isOpen: false,
            isOpenTwo: !this.state.isOpenTwo
        })
    }


    render() {

        const { isOpen, isOpenTwo } = this.state;

        return (
            <div>
                <div className={`mobile-menu ${this.props.toggleMenu ? 'mobile-menu-active' : ''}`}>
                    <ul className="mean-nav">
                        <li onClick={this.isDropDownOpenOne}>
                            {'Home'}
                            <i className="fa fa-angle-down"></i>
                        </li>
                        <Collapse in={isOpen}>
                            <ul>
                                <li>
                                    <Link onClick={() => this.props.onClose(false)}
                                        to={'/'}>
                                        {'Home Page 01'}
                                    </Link>
                                </li>
                                <li>
                                    <Link onClick={() => this.props.onClose(false)}
                                        to={'/homeTwo'}>
                                        {'Home Page 02'}
                                    </Link>
                                </li>
                                <li>
                                    <Link onClick={() => this.props.onClose(false)}
                                        to={'/homeThree'}>
                                        {'Home Page 03'}
                                    </Link>
                                </li>
                            </ul>
                        </Collapse>
                        <li>
                            <Link onClick={() => this.props.onClose(false)}
                                to={'/about'}>
                                {'About Us'}
                            </Link>
                        </li>
                        <li onClick={this.isDropDownOpenTwo}>
                            {'Pages'}
                            <i className="fa fa-angle-down"></i></li>
                        <Collapse in={isOpenTwo}>
                            <ul>
                                <li>
                                    <Link
                                        onClick={() => this.props.onClose(false)}
                                        to={'/gallery'}>
                                        {'Gallery'}
                                    </Link>
                                </li>
                                <li>
                                    <Link onClick={() => this.props.onClose(false)}
                                        to={'/team'}>
                                        {'Team'}
                                    </Link>
                                </li>
                                <li>
                                    <Link onClick={() => this.props.onClose(false)}
                                        to={'/faq'}>
                                        {'Faq'}
                                    </Link>
                                </li>
                                <li>
                                    <Link onClick={() => this.props.onClose(false)}
                                        to={'/game'}>
                                        {'Our Game'}
                                    </Link>
                                </li>
                                <li>
                                    <Link onClick={() => this.props.onClose(false)}
                                        to={'/matchese'}>
                                        {'Matchese'}
                                    </Link>
                                </li>
                                <li>
                                    <Link onClick={() => this.props.onClose(false)}
                                        to={'/matchese-details'}>
                                        {'Matchese Details'}
                                    </Link>
                                </li>
                                <li>
                                    <Link onClick={() => this.props.onClose(false)}
                                        to={'/live-streaming'}>
                                        {'Live Streaming'}
                                    </Link>
                                </li>
                                <li>
                                    <Link onClick={() => this.props.onClose(false)}
                                        to={'/single-post'}>
                                        {'Blog Details'}
                                    </Link>
                                </li>
                                <li>
                                    <Link onClick={() => this.props.onClose(false)}
                                        to={'/404'}>
                                        {'404 Page'}
                                    </Link>
                                </li>
                            </ul>
                        </Collapse>
                        <li>
                            <Link onClick={() => this.props.onClose(false)}
                                to={'/blog'}>
                                {'Blog'}
                            </Link>
                        </li>
                        <li>
                            <Link onClick={() => this.props.onClose(false)}
                                to={'/contact'}>
                                {'Contact'}
                            </Link>
                        </li>
                    </ul>

                </div>
            </div>
        )
    }
}
export default MobileMenu;