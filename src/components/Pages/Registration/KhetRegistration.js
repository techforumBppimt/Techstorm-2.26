import React from 'react';
import RegistrationForm from './RegistrationForm';
import khetBanner from '../../../assets/img/event_specific_pictures/games/khet.png';

const KhetRegistration = () => {
    const eventConfig = {
        eventName: 'Khet',
        breadcrumbBg: khetBanner,
        entryFee: '₹100 per team',
        minTeamSize: 1,
        maxTeamSize: 2,
        teamSizeOptions: [
            { value: '1', label: 'Solo (1 Member)' },
            { value: '2', label: 'Duo (2 Members)' }
        ],
        customFields: [
            {
                label: 'Board Game Experience',
                type: 'select',
                required: true,
                options: ['Beginner', 'Intermediate', 'Advanced', 'Expert']
            },
            {
                label: 'Have you played Khet before?',
                type: 'select',
                required: true,
                options: ['Yes, multiple times', 'Yes, once or twice', 'No, but I know the rules', 'No, first time']
            },
            {
                label: 'Strategy Game Experience',
                type: 'textarea',
                required: false,
                placeholder: 'Tell us about your experience with Chess, Laser Chess, or similar strategy games'
            },
            {
                label: 'How did you hear about Khet?',
                type: 'select',
                required: false,
                options: ['From friends', 'Online', 'At events', 'This is my first time hearing about it']
            }
        ]
    };

    return <RegistrationForm eventConfig={eventConfig} />;
};

export default KhetRegistration;
