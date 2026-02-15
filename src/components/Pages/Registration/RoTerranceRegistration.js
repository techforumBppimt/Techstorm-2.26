import React from 'react';
import RegistrationForm from './RegistrationForm';
import roTerranceBanner from '../../../assets/img/event_specific_pictures/robotics/ro_terrance.png';

const RoTerranceRegistration = () => {
    const eventConfig = {
        eventName: 'RoTerrance',
        breadcrumbBg: roTerranceBanner,
        entryFee: '₹200 per team',
        minTeamSize: 2,
        maxTeamSize: 3,
        teamSizeOptions: [
            { value: '2', label: 'Duo (2 Members)' },
            { value: '3', label: 'Trio (3 Members)' }
        ],
        customFields: [
            {
                label: 'Off-Road Robot Experience',
                type: 'select',
                required: true,
                options: ['First Time', 'Some Experience', 'Experienced']
            },
            {
                label: 'Do you have your own terrain robot?',
                type: 'select',
                required: true,
                options: ['Yes, we have our own', 'No, we need to build one']
            },
            {
                label: 'Robot Terrain Capabilities',
                type: 'textarea',
                required: true,
                placeholder: 'Describe your robot\'s terrain-handling capabilities and design features'
            },
            {
                label: 'Preferred Terrain Challenge',
                type: 'select',
                required: false,
                options: ['Hills & Slopes', 'Obstacles', 'Mixed Terrain', 'All Types']
            }
        ]
    };

    return <RegistrationForm eventConfig={eventConfig} />;
};

export default RoTerranceRegistration;
