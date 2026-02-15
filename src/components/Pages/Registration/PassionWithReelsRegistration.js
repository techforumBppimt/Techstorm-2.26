import React from 'react';
import RegistrationForm from './RegistrationForm';
import passionWithReelsBanner from '../../../assets/img/event_specific_pictures/creative/passion_with_reels.png';

const PassionWithReelsRegistration = () => {
    const eventConfig = {
        eventName: 'Passion With Reels',
        breadcrumbBg: passionWithReelsBanner,
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
                label: 'Video Editing Software',
                type: 'text',
                required: true,
                placeholder: 'e.g., Premiere Pro, Final Cut, DaVinci Resolve, CapCut, etc.'
            },
            {
                label: 'Content Creation Experience',
                type: 'select',
                required: true,
                options: ['Beginner', 'Intermediate', 'Advanced', 'Professional Creator']
            },
            {
                label: 'Social Media Handle',
                type: 'text',
                required: false,
                placeholder: 'Instagram/YouTube channel (optional)'
            },
            {
                label: 'Preferred Reel Theme',
                type: 'select',
                required: true,
                options: ['Tech Review', 'Comedy', 'Educational', 'Cinematic', 'Any Theme']
            },
            {
                label: 'Video Concept/Idea',
                type: 'textarea',
                required: false,
                placeholder: 'Share your preliminary concept or ideas for the reel'
            }
        ]
    };

    return <RegistrationForm eventConfig={eventConfig} />;
};

export default PassionWithReelsRegistration;
