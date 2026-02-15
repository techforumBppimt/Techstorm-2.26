import React from 'react';
import RegistrationForm from './RegistrationForm';
import forzaHorizonBanner from '../../../assets/img/event_specific_pictures/games/forza_horizon.png';

const ForzaHorizonRegistration = () => {
    const eventConfig = {
        eventName: 'Forza Horizon',
        breadcrumbBg: forzaHorizonBanner,
        entryFee: '₹50 per participant',
        minTeamSize: 1,
        maxTeamSize: 1,
        teamSizeOptions: [
            { value: '1', label: 'Solo (Individual Event)' }
        ],
        customFields: [
            {
                label: 'Forza Horizon Experience',
                type: 'select',
                required: true,
                options: ['Complete Beginner', 'Casual Player', 'Regular Player', 'Pro/Competitive']
            },
            {
                label: 'Gaming Platform',
                type: 'select',
                required: true,
                options: ['PC', 'Xbox', 'Both']
            },
            {
                label: 'Favorite Car Class',
                type: 'select',
                required: false,
                options: ['D Class', 'C Class', 'B Class', 'A Class', 'S1 Class', 'S2 Class', 'X Class']
            },
            {
                label: 'Preferred Race Type',
                type: 'select',
                required: false,
                options: ['Street Racing', 'Road Racing', 'Dirt Racing', 'Cross Country', 'Any Type']
            },
            {
                label: 'Gaming Controller',
                type: 'select',
                required: true,
                options: ['Keyboard & Mouse', 'Controller/Gamepad', 'Steering Wheel']
            }
        ]
    };

    return <RegistrationForm eventConfig={eventConfig} />;
};

export default ForzaHorizonRegistration;
