import React from 'react';
import RegistrationForm from './RegistrationForm';
import fifaMobileBanner from '../../../assets/img/event_specific_pictures/games/fifa_mobile.png';

const FifaMobileRegistration = () => {
    const eventConfig = {
        eventName: 'FIFA Mobile',
        breadcrumbBg: fifaMobileBanner,
        entryFee: '₹50 per participant',
        minTeamSize: 1,
        maxTeamSize: 1,
        teamSizeOptions: [
            { value: '1', label: 'Solo (Individual Event)' }
        ],
        customFields: [
            {
                label: 'FIFA Mobile Experience',
                type: 'select',
                required: true,
                options: ['Beginner', 'Intermediate', 'Advanced', 'Pro Player']
            },
            {
                label: 'Current Overall Rating (Team)',
                type: 'text',
                required: true,
                placeholder: 'Enter your team OVR (e.g., 115)'
            },
            {
                label: 'Preferred Formation',
                type: 'text',
                required: false,
                placeholder: 'e.g., 4-3-3, 4-2-4, 5-2-2-1'
            },
            {
                label: 'Favorite Player/Team',
                type: 'text',
                required: false,
                placeholder: 'Your favorite player or club team'
            },
            {
                label: 'Gaming Device',
                type: 'select',
                required: true,
                options: ['Android', 'iOS']
            },
            {
                label: 'H2H or VSA Experience',
                type: 'select',
                required: true,
                options: ['Head to Head Expert', 'VS Attack Expert', 'Both Modes', 'Still Learning']
            }
        ]
    };

    return <RegistrationForm eventConfig={eventConfig} />;
};

export default FifaMobileRegistration;
