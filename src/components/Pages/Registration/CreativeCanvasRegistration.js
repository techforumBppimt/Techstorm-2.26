import React from 'react';
import RegistrationForm from './RegistrationForm';
import creativeCanvasBanner from '../../../assets/img/event_specific_pictures/creative/creative_canvas.png';

const CreativeCanvasRegistration = () => {
    const eventConfig = {
        eventName: 'Creative Canvas',
        breadcrumbBg: creativeCanvasBanner,
        entryFee: '₹100 per participant',
        minTeamSize: 1,
        maxTeamSize: 2,
        teamSizeOptions: [
            { value: '1', label: 'Solo (1 Member)' },
            { value: '2', label: 'Duo (2 Members)' }
        ],
        customFields: [
            {
                label: 'Design Tools Expertise',
                type: 'text',
                required: true,
                placeholder: 'e.g., Photoshop, Illustrator, Figma, Canva, etc.'
            },
            {
                label: 'Preferred Design Category',
                type: 'select',
                required: true,
                options: ['Poster Design', 'Logo Design', 'UI/UX Design', 'Digital Art', 'All Categories']
            },
            {
                label: 'Portfolio Link',
                type: 'text',
                required: false,
                placeholder: 'Behance, Dribbble, or personal portfolio URL'
            },
            {
                label: 'Design Experience',
                type: 'select',
                required: true,
                options: ['Beginner', 'Intermediate', 'Advanced', 'Professional']
            },
            {
                label: 'What inspires your designs?',
                type: 'textarea',
                required: false,
                placeholder: 'Tell us about your creative process and inspiration'
            }
        ]
    };

    return <RegistrationForm eventConfig={eventConfig} />;
};

export default CreativeCanvasRegistration;
