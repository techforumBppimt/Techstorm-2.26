import React from 'react';
import matchBgImg from '../../../assets/img/bg/match-bg.png';

// Import pixelated event mascots
import codeBee from '../../../assets/img/PIXELATED EVENT MASCOTS/CODE BEE.png';
import hackStorm from '../../../assets/img/PIXELATED EVENT MASCOTS/HACKSTORM.png';
import technomania from '../../../assets/img/PIXELATED EVENT MASCOTS/TECHNOMANIA.png';
import roNavigator from '../../../assets/img/PIXELATED EVENT MASCOTS/RO-NAVIGATOR.png';
import roCombat from '../../../assets/img/PIXELATED EVENT MASCOTS/RO-COMBAT.png';
import roSoccer from '../../../assets/img/PIXELATED EVENT MASCOTS/RO-SOCCER.png';
import roTerrance from '../../../assets/img/PIXELATED EVENT MASCOTS/RO-TERRANCE.png';
import techHunt from '../../../assets/img/PIXELATED EVENT MASCOTS/TECH HUNT.png';
import omegatrix from '../../../assets/img/PIXELATED EVENT MASCOTS/OMEGATRIX.png';
import creativeCanvas from '../../../assets/img/PIXELATED EVENT MASCOTS/CREATIVE CANVAS.png';
import passionWithReels from '../../../assets/img/PIXELATED EVENT MASCOTS/PASSION WITH REELS.png';
import khet from '../../../assets/img/PIXELATED EVENT MASCOTS/KHET.png';
import forzaHorizon from '../../../assets/img/PIXELATED EVENT MASCOTS/FORZA HORIZON.png';
import fifaMobile from '../../../assets/img/PIXELATED EVENT MASCOTS/FIFA Mobile.png';

import SectionTitle from '../SectionTitle/SectionTitle';

const Matches = () => {
    
    const events = [
        { logo: codeBee, name: 'Code-Bee', category: 'Technical' },
        { logo: hackStorm, name: 'Hack Storm', category: 'Technical' },
        { logo: technomania, name: 'TechnoMania', category: 'Technical' },
        { logo: omegatrix, name: 'Omegatrix', category: 'Brain Teaser' },
        { logo: techHunt, name: 'Tech Hunt', category: 'Brain Teaser' },
        { logo: roNavigator, name: 'Ro-Navigator', category: 'Rover' },
        { logo: roCombat, name: 'Ro-Combat', category: 'Rover' },
        { logo: roSoccer, name: 'Ro-Soccer', category: 'Rover' },
        { logo: roTerrance, name: 'Ro-Terrance', category: 'Rover' },
        { logo: creativeCanvas, name: 'Creative Canvas', category: 'Creative' },
        { logo: passionWithReels, name: 'Passion with Reels', category: 'Creative' },
        { logo: forzaHorizon, name: 'Forza Horizon', category: 'Games' },
        { logo: fifaMobile, name: 'FIFA Mobile', category: 'Games' },
        { logo: khet, name: 'KHET', category: 'Games' },
    ]

    return (
        <section id="match" className="match-area pt-120 pb-90" style={{ background: `url(${matchBgImg})` }}>
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-12">
                        <SectionTitle titlefirst='Featured' titleSec='Events' />
                    </div>
                </div>
                <div className="row">
                    {
                        events.map((event, index) => {
                            const { logo, name } = event;
                            return (
                                <div key={index} className="col-lg-4 col-md-6 col-sm-6 mb-40 wow fadeInUp animated" data-animation="fadeInUp" data-delay={`${0.1 * index}s`}>
                                    <div style={{
                                        width: '100%',
                                        aspectRatio: '16/9',
                                        background: 'rgba(0, 0, 0, 0.9)',
                                        clipPath: 'polygon(25px 0, 100% 0, 100% calc(100% - 25px), calc(100% - 25px) 100%, 0 100%, 0 25px)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        padding: '20px'
                                    }}>
                                        {/* Corner fold effects */}
                                        <div style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: '35px',
                                            height: '35px',
                                            background: 'linear-gradient(135deg, #FDC83A 50%, transparent 50%)',
                                            opacity: 0.8
                                        }}></div>
                                        <div style={{
                                            position: 'absolute',
                                            bottom: 0,
                                            right: 0,
                                            width: '35px',
                                            height: '35px',
                                            background: 'linear-gradient(315deg, #FDC83A 50%, transparent 50%)',
                                            opacity: 0.8
                                        }}></div>
                                        
                                        {/* Mascot image */}
                                        <img src={logo} alt={name} style={{ 
                                            maxWidth: '70%', 
                                            maxHeight: '65%', 
                                            objectFit: 'contain',
                                            filter: 'drop-shadow(0 0 15px rgba(30, 144, 255, 0.6))',
                                            marginBottom: '15px'
                                        }} />
                                        
                                        {/* Event name */}
                                        <h4 style={{ 
                                            color: '#FFF4C7', 
                                            fontSize: '16px', 
                                            margin: 0,
                                            textAlign: 'center',
                                            fontFamily: '"Press Start 2P", system-ui',
                                            textShadow: '0 0 15px rgba(30, 144, 255, 0.6)',
                                            lineHeight: '1.4'
                                        }}>{name}</h4>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </section>
    );
}

export default Matches;