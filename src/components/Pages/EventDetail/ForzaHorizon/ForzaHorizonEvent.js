import React from 'react';
import EventDetail from '../EventDetail';
import forzaHorizon from '../../../../assets/img/PIXELATED EVENT MASCOTS/FORZA HORIZON.png';
import forzaHorizonBanner from '../../../../assets/img/event_specific_pictures/games/forza_horizon.png';

const ForzaHorizonEvent = () => {
    const eventData = {
        name: 'Forza Horizon',
        logo: forzaHorizon,
        category: 'Gaming',
        breadcrumbBg: forzaHorizonBanner,
        description: 'Forza Horizon brings high-octane racing action to TechStorm! Compete in the ultimate racing simulation where speed, skill, and strategy collide. Master different tracks, perfect your racing lines, and leave your opponents in the dust. Whether you\'re a casual racer or a sim-racing pro, this tournament will test your driving abilities to the limit.',
        teamSize: '1 Member',
        duration: '4 Hours',
        venue: 'Gaming Zone A',
        rules: [
            '🎮 FORZA HORIZON GAME RULES',
            '',
            '',
            'BASIC PARTICIPATION RULES:',
            // ...existing code...
            'Each participant must register before the event starts. Without fee submission, no entry.',
            'One player per controller/account.',
            'No abusive language or unsportsmanlike behavior.',
            'All events are non-refundable. This must be clearly mentioned in the rules. And it’s an offline fest.',
            '',
            '🎮 GAME SETUP RULES',
            'Use the same difficulty settings for all players.',
            'Assists (braking, steering, traction) should be fixed beforehand.',
            'Same camera view recommended (optional).',
            '',
            '🚗 CAR & RACE RULES',
            'Pre-select allowed cars (avoid overpowered cars).',
            'Same car class for all (example: A800 or S1 class).',
            'No custom tuning unless allowed by organizers.',
            '',
            '⏱ RACE FORMAT RULES',
            'Decide race type beforehand:',
            '   a. Time trial OR',
            '   b. Knockout rounds OR',
            '   c. Points-based tournament.',
            'Fixed number of laps/tracks for everyone.',
            '',
            '⚠️ FAIR PLAY RULES',
            'No intentional crashing or blocking.',
            'No game exploits or glitches.',
            'Controller tampering not allowed.',
            '',
            '🏆 WINNER CRITERIA',
            'Fastest lap / total race time OR',
            'Highest points across races.',
            'In case of tie → one final tiebreaker race.',
            '',
            '🔧 TECHNICAL RULES',
            'Organizers’ decision final if technical issues occur.',
            'Restart race only for major glitches or system crash.',
            'Players must report issues immediately.',
            '',
            '👥 AUDIENCE & CONDUCT RULES',
            'Spectators shouldn’t distract players.',
            'Maintain discipline around the gaming setup.'
        ],
        prizes: [
            { position: '1st Prize', amount: '₹10,000' },
            { position: '2nd Prize', amount: '₹6,000' },
            { position: '3rd Prize', amount: '₹4,000' }
        ],
        contact: [
            {
                name: 'Gaming Head',
                phone: '+91 98765 43232',
                email: 'forza@techstorm.com'
            },
            {
                name: 'Tournament Admin',
                phone: '+91 98765 43233',
                email: 'racing@techstorm.com'
            }
        ],
        registerButton: {
            text: 'Register Now',
            link: 'https://forms.gle/your-registration-form-link'
        }
    };

    return <EventDetail eventData={eventData} />;
};

export default ForzaHorizonEvent;
