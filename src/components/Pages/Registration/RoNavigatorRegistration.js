import React from 'react';
import RegistrationForm from './RegistrationForm';
import roNavigatorBanner from '../../../assets/img/event_specific_pictures/robotics/ro_navigator.png';

const RoNavigatorRegistration = () => {
    const eventConfig = {
        eventName: 'RoNavigator',
        breadcrumbBg: roNavigatorBanner,
        entryFee: '₹200 per team',
        minTeamSize: 2,
        maxTeamSize: 3,
        teamSizeOptions: [
            { value: '2', label: 'Duo (2 Members)' },
            { value: '3', label: 'Trio (3 Members)' }
        ],
        customFields: [
            {
                label: 'Robotics Experience',
                type: 'select',
                required: true,
                options: ['Beginner', 'Intermediate', 'Advanced', 'Expert']
            },
            {
                label: 'Do you have your own robot?',
                type: 'select',
                required: true,
                options: ['Yes, we have our own robot', 'No, we need to borrow/rent']
            },
            {
                label: 'Robot Navigation Experience',
                type: 'textarea',
                required: false,
                placeholder: 'Describe your experience with line following, maze solving, or path navigation'
            },
            {
                label: 'Programming Language for Robot',
                type: 'select',
                required: true,
                options: ['Arduino C/C++', 'Python', 'Other']
            }
        ]
    };

    return <RegistrationForm eventConfig={eventConfig} />;
};

export default RoNavigatorRegistration;
