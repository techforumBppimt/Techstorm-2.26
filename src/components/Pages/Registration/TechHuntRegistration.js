import React from 'react';
import RegistrationForm from './RegistrationForm';
import techHuntBanner from '../../../assets/img/event_specific_pictures/techHunt/techhunt_banner.png';

const TechHuntRegistration = () => {
    const eventConfig = {
        eventName: 'TechHunt',
        breadcrumbBg: techHuntBanner,
        entryFee: '₹150 per team',
        minTeamSize: 2,
        maxTeamSize: 4,
        teamSizeOptions: [
            { value: '2', label: 'Duo (2 Members)' },
            { value: '3', label: 'Trio (3 Members)' },
            { value: '4', label: 'Squad (4 Members)' }
        ],
        customFields: [
            {
                label: 'Treasure Hunt Experience',
                type: 'select',
                required: true,
                options: ['First Time', 'Some Experience', 'Experienced Hunter']
            },
            {
                label: 'Team Strategy Approach',
                type: 'textarea',
                required: false,
                placeholder: 'Describe your team\'s approach to solving puzzles and clues'
            },
            {
                label: 'Strong Skills in Your Team',
                type: 'text',
                required: true,
                placeholder: 'e.g., Puzzle solving, Cryptography, Pattern recognition'
            }
        ]
    };

    return <RegistrationForm eventConfig={eventConfig} />;
};

export default TechHuntRegistration;
