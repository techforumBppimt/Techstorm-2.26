import React from 'react';
import RegistrationForm from './RegistrationForm';
import roCombatBanner from '../../../assets/img/event_specific_pictures/robotics/ro_combat.png';

const RoCombatRegistration = () => {
    const eventConfig = {
        eventName: 'RoCombat',
        breadcrumbBg: roCombatBanner,
        entryFee: '₹250 per team',
        minTeamSize: 2,
        maxTeamSize: 4,
        teamSizeOptions: [
            { value: '2', label: 'Duo (2 Members)' },
            { value: '3', label: 'Trio (3 Members)' },
            { value: '4', label: 'Squad (4 Members)' }
        ],
        customFields: [
            {
                label: 'Robot Weight Category',
                type: 'select',
                required: true,
                options: ['Lightweight (< 5kg)', 'Middleweight (5-10kg)', 'Heavyweight (10-15kg)']
            },
            {
                label: 'Do you have your own combat robot?',
                type: 'select',
                required: true,
                options: ['Yes, we have our own robot', 'No, we need to build one']
            },
            {
                label: 'Combat Robot Experience',
                type: 'select',
                required: true,
                options: ['First Time', '1-2 Events', '3+ Events']
            },
            {
                label: 'Robot Specifications & Weapons',
                type: 'textarea',
                required: true,
                placeholder: 'Describe your robot design, weapons, and special features'
            },
            {
                label: 'Safety Declaration',
                type: 'select',
                required: true,
                options: ['I agree to follow all safety guidelines']
            }
        ]
    };

    return <RegistrationForm eventConfig={eventConfig} />;
};

export default RoCombatRegistration;
