import React from 'react';
import RegistrationForm from './RegistrationForm';
import technomaniaBanner from '../../../assets/img/event_specific_pictures/technomania/technomania.png';

const TechnomaniaRegistration = () => {
    const eventConfig = {
        eventName: 'Technomania',
        breadcrumbBg: technomaniaBanner,
        entryFee: '₹150 per team',
        minTeamSize: 1,
        maxTeamSize: 3,
        teamSizeOptions: [
            { value: '1', label: 'Solo (1 Member)' },
            { value: '2', label: 'Duo (2 Members)' },
            { value: '3', label: 'Trio (3 Members)' }
        ],
        customFields: [
            {
                label: 'Preferred Quiz Categories',
                type: 'textarea',
                required: true,
                placeholder: 'Select your strong areas: Tech History, Current Tech, Programming, AI/ML, etc.'
            },
            {
                label: 'Previous Quiz Competition Experience',
                type: 'select',
                required: true,
                options: ['Beginner', 'Intermediate', 'Advanced', 'Expert']
            }
        ]
    };

    return <RegistrationForm eventConfig={eventConfig} />;
};

export default TechnomaniaRegistration;
