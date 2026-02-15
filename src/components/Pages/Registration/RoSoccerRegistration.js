import React from 'react';
import RegistrationForm from './RegistrationForm';
import roSoccerBanner from '../../../assets/img/event_specific_pictures/robotics/ro_soccer.png';

const RoSoccerRegistration = () => {
    const eventConfig = {
        eventName: 'RoSoccer',
        breadcrumbBg: roSoccerBanner,
        entryFee: '₹200 per team',
        minTeamSize: 2,
        maxTeamSize: 3,
        teamSizeOptions: [
            { value: '2', label: 'Duo (2 Members)' },
            { value: '3', label: 'Trio (3 Members)' }
        ],
        customFields: [
            {
                label: 'Robotics Experience Level',
                type: 'select',
                required: true,
                options: ['Beginner', 'Intermediate', 'Advanced', 'Expert']
            },
            {
                label: 'Do you have a soccer robot?',
                type: 'select',
                required: true,
                options: ['Yes, we have our own', 'No, we need to build/borrow']
            },
            {
                label: 'Robot Soccer Experience',
                type: 'textarea',
                required: false,
                placeholder: 'Any previous experience with robot soccer or similar competitions'
            },
            {
                label: 'Robot Control System',
                type: 'select',
                required: true,
                options: ['Manual/RC', 'Semi-Autonomous', 'Fully Autonomous']
            }
        ]
    };

    return <RegistrationForm eventConfig={eventConfig} />;
};

export default RoSoccerRegistration;
