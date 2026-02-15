import React from 'react';
import RegistrationForm from './RegistrationForm';
import omegatrixBanner from '../../../assets/img/event_specific_pictures/omegatrix/OMEGATRIX_banner.png';

const OmegatrixRegistration = () => {
    const eventConfig = {
        eventName: 'Omegatrix',
        breadcrumbBg: omegatrixBanner,
        entryFee: '₹100 per participant',
        minTeamSize: 1,
        maxTeamSize: 1,
        teamSizeOptions: [
            { value: '1', label: 'Solo (Individual Event)' }
        ],
        customFields: [
            {
                label: 'Preferred Presentation Topic',
                type: 'text',
                required: true,
                placeholder: 'Your presentation topic area'
            },
            {
                label: 'Public Speaking Experience',
                type: 'select',
                required: true,
                options: ['First Time', 'Some Experience', 'Experienced', 'Very Experienced']
            },
            {
                label: 'Brief Outline of Your Presentation',
                type: 'textarea',
                required: true,
                placeholder: 'Provide a brief outline of what you plan to present'
            }
        ]
    };

    return <RegistrationForm eventConfig={eventConfig} />;
};

export default OmegatrixRegistration;
