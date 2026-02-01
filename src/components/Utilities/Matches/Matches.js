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
    
    const matches = [
        {
            logoTeamOne: codeBee,
            teamTag1: 'Technical',
            teamName1: 'Code-Bee',
            logoTeamTwo: hackStorm,
            teamTag2: 'Technical',
            teamName2: 'Hack Storm',
        },
        {
            logoTeamOne: technomania,
            teamTag1: 'Technical',
            teamName1: 'TechnoMania',
            logoTeamTwo: omegatrix,
            teamTag2: 'Brain Teaser',
            teamName2: 'Omegatrix',
        },
        {
            logoTeamOne: techHunt,
            teamTag1: 'Brain Teaser',
            teamName1: 'Tech Hunt',
            logoTeamTwo: roNavigator,
            teamTag2: 'Rover',
            teamName2: 'Ro-Navigator',
        },
        {
            logoTeamOne: roCombat,
            teamTag1: 'Rover',
            teamName1: 'Ro-Combat',
            logoTeamTwo: roSoccer,
            teamTag2: 'Rover',
            teamName2: 'Ro-Soccer',
        },
        {
            logoTeamOne: roTerrance,
            teamTag1: 'Rover',
            teamName1: 'Ro-Terrance',
            logoTeamTwo: creativeCanvas,
            teamTag2: 'Creative',
            teamName2: 'Creative Canvas',
        },
        {
            logoTeamOne: passionWithReels,
            teamTag1: 'Creative',
            teamName1: 'Passion with Reels',
            logoTeamTwo: forzaHorizon,
            teamTag2: 'Games',
            teamName2: 'Forza Horizon',
        },
        {
            logoTeamOne: fifaMobile,
            teamTag1: 'Games',
            teamName1: 'FIFA Mobile',
            logoTeamTwo: khet,
            teamTag2: 'Games',
            teamName2: 'KHET',
        },
    ]

    return (
        <section id="match" className="match-area pt-120 pb-90" style={{ background: `url(${matchBgImg})` }}>
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-12">
                        <SectionTitle titlefirst='Featured' titleSec='Events' />
                    </div>
                </div>
                {
                    matches.map((match, index) => {
                        const {
                            logoTeamOne,
                            teamTag1,
                            teamName1,
                            logoTeamTwo,
                            teamTag2,
                            teamName2,
                        } = match;
                        return (
                            <div key={index} className="row align-items-center mb-30 wow fadeInDown animated" data-animation="fadeInRight" data-delay=".4s">
                                <div className="col-lg-5">
                                    <div className="team" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                                        <img src={logoTeamOne} alt={teamName1} style={{ marginBottom: '15px', position: 'relative' }} />
                                        <div className="text" style={{ position: 'relative', top: 'auto', right: 'auto', left: 'auto', width: 'auto', textAlign: 'center' }}>
                                            <h3>{teamName1}</h3>
                                            <span>{teamTag1}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-2">
                                    <div className="match-time text-center">
                                        <h4 style={{ fontSize: '24px', color: '#ffc010' }}>VS</h4>
                                    </div>
                                </div>
                                <div className="col-lg-5">
                                    <div className="team2" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                                        <img src={logoTeamTwo} alt={teamName2} style={{ marginBottom: '15px', float: 'none', position: 'relative' }} />
                                        <div className="text" style={{ position: 'relative', top: 'auto', right: 'auto', left: 'auto', width: 'auto', textAlign: 'center' }}>
                                            <h3>{teamName2}</h3>
                                            <span>{teamTag2}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </section>
    );
}

export default Matches;