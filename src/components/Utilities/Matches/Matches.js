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
    const [hoveredIndex, setHoveredIndex] = React.useState(null);
    const [activeFilter, setActiveFilter] = React.useState('All');
    
    const allEvents = [
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
    ];

    const [filteredEvents, setFilteredEvents] = React.useState(allEvents);

    const filterEvents = (category) => {
        setActiveFilter(category);
        if (category === 'All') {
            setFilteredEvents(allEvents);
        } else {
            const filtered = allEvents.filter(event => {
                if (category === 'Coding') return event.category === 'Technical';
                if (category === 'Robotics') return event.category === 'Rover';
                if (category === 'Gaming') return event.category === 'Games';
                if (category === 'Brain Teaser') return event.category === 'Brain Teaser';
                if (category === 'Creative') return event.category === 'Creative';
                return false;
            });
            setFilteredEvents(filtered);
        }
    };

    const events = filteredEvents.length > 0 ? filteredEvents : allEvents;

    return (
        <section id="match" className="match-area pt-60 pb-90" style={{ background: `url(${matchBgImg})` }}>
            <div className="container">
                <div className="row align-items-center mb-30">
                    <div className="col-lg-12">
                        <SectionTitle titlefirst='Featured' titleSec='Events' />
                    </div>
                    <div className="col-lg-12">
                        <div className="my-masonry wow fadeInDown animated" data-animation="fadeInRight" data-delay=".4s">
                            <div className="button-group filter-button-group" style={{ textAlign: 'center', marginBottom: '20px' }}>
                                <button className={activeFilter === 'All' ? 'active' : ''} onClick={() => filterEvents('All')}>All</button>
                                <button className={activeFilter === 'Coding' ? 'active' : ''} onClick={() => filterEvents('Coding')}>Coding</button>
                                <button className={activeFilter === 'Robotics' ? 'active' : ''} onClick={() => filterEvents('Robotics')}>Robotics</button>
                                <button className={activeFilter === 'Gaming' ? 'active' : ''} onClick={() => filterEvents('Gaming')}>Gaming</button>
                                <button className={activeFilter === 'Brain Teaser' ? 'active' : ''} onClick={() => filterEvents('Brain Teaser')}>Brain Teaser</button>
                                <button className={activeFilter === 'Creative' ? 'active' : ''} onClick={() => filterEvents('Creative')}>Creative</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {
                        events.map((event, index) => {
                            const { logo, name } = event;
                            return (
                                <div key={index} className="col-lg-4 col-md-6 col-sm-6 mb-40 wow fadeInUp animated" data-animation="fadeInUp" data-delay={`${0.1 * index}s`}>
                                    <div 
                                        onMouseEnter={() => setHoveredIndex(index)}
                                        onMouseLeave={() => setHoveredIndex(null)}
                                        style={{
                                        width: '100%',
                                        aspectRatio: '16/9',
                                        background: hoveredIndex === index ? 'rgba(255, 192, 16, 0.9)' : 'rgba(0, 0, 0, 0.9)',
                                        clipPath: 'polygon(25px 0, 100% 0, 100% calc(100% - 25px), calc(100% - 25px) 100%, 0 100%, 0 25px)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        padding: '20px',
                                        transition: 'background 0.3s ease, transform 0.3s ease',
                                        transform: hoveredIndex === index ? 'scale(1.05)' : 'scale(1)',
                                        cursor: 'pointer'
                                    }}>
                                        {/* Corner fold effects */}
                                        <div style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: '35px',
                                            height: '35px',
                                            background: 'linear-gradient(135deg, #ffc010 50%, transparent 50%)',
                                            opacity: 0.8
                                        }}></div>
                                        <div style={{
                                            position: 'absolute',
                                            bottom: 0,
                                            right: 0,
                                            width: '35px',
                                            height: '35px',
                                            background: 'linear-gradient(315deg, #ffc010 50%, transparent 50%)',
                                            opacity: 0.8
                                        }}></div>
                                        
                                        {/* Mascot image */}
                                        <img src={logo} alt={name} style={{ 
                                            maxWidth: '70%', 
                                            maxHeight: '65%', 
                                            objectFit: 'contain',
                                            filter: 'drop-shadow(0 0 15px rgba(255, 192, 16, 0.6))',
                                            marginBottom: '15px'
                                        }} />
                                        
                                        {/* Event name */}
                                        <h4 style={{ 
                                            color: hoveredIndex === index ? '#1a0e22' : '#fff',
                                            fontSize: '16px', 
                                            margin: 0,
                                            textAlign: 'center',
                                            fontFamily: '"Press Start 2P", system-ui',
                                            textShadow: hoveredIndex === index ? 'none' : '0 0 15px rgba(255, 192, 16, 0.6)',
                                            lineHeight: '1.4',
                                            transition: 'color 0.3s ease, text-shadow 0.3s ease'
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