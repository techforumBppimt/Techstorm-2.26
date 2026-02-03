/**
 * Team data from TechStorm 2.24 team page template.
 * Core members = Organizing Committee; eventTeams = event-wise coordinators & volunteers.
 */

import team1 from '../../../assets/img/team/team_img02.png';
import team2 from '../../../assets/img/team/team_img03.png';
import team3 from '../../../assets/img/team/team_img04.png';
import team4 from '../../../assets/img/team/team_img05.png';
import team5 from '../../../assets/img/team/team_img06.png';
import team6 from '../../../assets/img/team/team_img07.png';
import team7 from '../../../assets/img/team/team_img01.png';
import team8 from '../../../assets/img/team/team_img08.png';

export const coreMembers = [
    { id: '1', avatar: team1, name: '[Name]', deg: 'Convenor' },
    { id: '2', avatar: team2, name: '[Name]', deg: 'Co-Convenor' },
    { id: '3', avatar: team3, name: '[Name]', deg: 'Technical Head' },
    { id: '4', avatar: team4, name: '[Name]', deg: 'Creative Head' },
    { id: '5', avatar: team5, name: '[Name]', deg: 'Sponsorship Head' },
    { id: '6', avatar: team6, name: '[Name]', deg: 'PR Head' },
    { id: '7', avatar: team7, name: '[Name]', deg: '[Role]' },
    { id: '8', avatar: team8, name: '[Name]', deg: '[Role]' },
    { id: '9', avatar: team1, name: '[Name]', deg: '[Role]' },
    { id: '10', avatar: team2, name: '[Name]', deg: '[Role]' },
    { id: '11', avatar: team3, name: '[Name]', deg: '[Role]' },
];

export const eventTeams = [
    {
        id: 'code-bee',
        eventName: 'Code Bee',
        coordinators: [
            { name: 'Subrata Bhuin', dept: 'CSE', phone: '8918210742' },
            { name: 'Shuvechha Nandi', dept: 'CSE', phone: '9477063362' },
            { name: 'Agradip Banik', dept: 'IT', phone: '6289933166' },
        ],
        volunteers: ['Madhu Singh (IT)', 'Satarupa Sen (IT)', 'Somshree Saha (BCA)', 'Sauvick Pramanik (MCA)'],
    },
    {
        id: 'app-mania',
        eventName: 'App Mania',
        coordinators: [
            { name: 'Shreya Gupta', dept: 'IT', phone: '9123389663' },
            { name: 'Dipnarayan Sen', dept: 'CSE', phone: '6290501035' },
        ],
        volunteers: ['Payel Pal (CSE)', 'Archak Nath (IT)'],
    },
    {
        id: 'omegatrix',
        eventName: 'OMEGATRIX',
        coordinators: [
            { name: 'Satakshi Guha', dept: 'ECE', phone: '9330206747' },
            { name: 'Rahul Roy', dept: 'EE', phone: '9903436872' },
        ],
        volunteers: ['Swarnendu Saha (MCA)', 'Subhrajyoti Roy (BCA)', 'Shubhradip Saha (CSE)', 'Parna Chakraborty (ECE)'],
    },
    {
        id: 'passion-with-reels',
        eventName: 'Passion With Reels',
        coordinators: [
            { name: 'Meghna Gupta', dept: 'CSE', phone: '9339369752' },
            { name: 'Anupurba Bose', dept: 'IT', phone: '9038001393' },
        ],
        volunteers: ['Madhu Singh (IT 3)', 'Pratham Saha (ECE)'],
    },
    {
        id: 'creative-canvas',
        eventName: 'Creative Canvas',
        coordinators: [
            { name: 'Sheetam Coondoo', dept: 'IT', phone: '9051634001' },
            { name: 'Ipsita Mitra', dept: 'CSE', phone: '6290410210' },
        ],
        volunteers: ['Sanjiv Sen (IT)', 'Rohit Kumar Mahato (ECE)'],
    },
    {
        id: 'technical-writing',
        eventName: 'Technical Writing With Poster Presentation',
        coordinators: [
            { name: 'Purnima Naskar', dept: 'ECE', phone: '9330189899' },
            { name: 'Ishika Rana', dept: 'IT', phone: '8017667204' },
        ],
        volunteers: ['Ambapali Datta (IT)', 'Sagar Priyadarshani (ECE)', 'Udita Sinha (CSE)'],
    },
    {
        id: 'tech-hunt',
        eventName: 'Tech - Hunt',
        coordinators: [
            { name: 'B. Yaminy', dept: 'EE', phone: '8335864670' },
            { name: 'Meenakshi Sharma', dept: 'IT', phone: '9830858204' },
        ],
        volunteers: ['Tiyasa Mohanty (ECE)', 'Debangshi Biswas (EE)', 'Tamal Majumdar (IT)', 'Rani Singh (CSE)', 'Suryanshu Paul (CSE)'],
    },
    {
        id: 'fifa-console',
        eventName: 'FIFA (Console)',
        coordinators: [
            { name: 'Rwiddhi Bagchi', dept: 'CSE', phone: '9733001475' },
            { name: 'Arnesh Sen', dept: 'ECE', phone: '6295528792' },
        ],
        volunteers: ['Satadru Jana (EE)', 'Samyak Sen (CSE 3)'],
    },
    {
        id: 'pes-mobile',
        eventName: 'PES (Mobile)',
        coordinators: [
            { name: 'Debjit Paul', dept: 'CSE', phone: '9830448850' },
            { name: 'Hrishikesh Kumar Chaudhary', dept: 'IT', phone: '8100448947' },
        ],
        volunteers: ['Krantish Sasmal (ECE 3)', 'Srutikana Das (CSE)'],
    },
    {
        id: 'ro-navigator',
        eventName: 'RO - Navigator',
        coordinators: [
            { name: 'Shivam Kumar Biswas', dept: 'ECE', phone: '7044947825' },
            { name: 'Rachit Jaiswal', dept: 'CSE', phone: '7278069372' },
        ],
        volunteers: ['Sougata Roy Chowdhury (EE)', 'Debparna Ghatak (ECE 3)'],
    },
    {
        id: 'ro-soccer',
        eventName: 'RO - Soccer',
        coordinators: [
            { name: 'Aditya Prasad', dept: 'CSE', phone: '9123373980' },
            { name: 'Suroj Mete', dept: 'ECE', phone: '9547824460' },
        ],
        volunteers: ['Tanushka Joshi (EE)', 'Rohit Yadav (EE)'],
    },
    {
        id: 'ro-terrance',
        eventName: 'RO - Terrance',
        coordinators: [
            { name: 'Aditya Raj', dept: 'CSE', phone: '9334015381' },
            { name: 'Amit Das', dept: 'ECE', phone: '8240321349' },
        ],
        volunteers: ['Arindam Paul (EE 3)', 'Safalya Pan (ECE 3)'],
    },
    {
        id: 'ro-combat',
        eventName: 'RO - Combat',
        coordinators: [
            { name: 'Priyanshu Mandal', dept: 'ECE', phone: '9330682757' },
        ],
        volunteers: ['Ayush Singh (ECE 2)', 'Subhajit Sarkar (EE 3)', 'Bappa Patra (EE 3)'],
    },
    {
        id: 'aqua-race',
        eventName: 'Aqua Race',
        coordinators: [
            { name: 'Sayan Patra', dept: 'EE', phone: '7439316236' },
            { name: 'Mouboni Mukherjee', dept: 'ECE', phone: '8697789509' },
        ],
        volunteers: ['Koushambha Das (IT)', 'Ankit Narayan Prasad (CSE 3)'],
    },
    {
        id: 'khet',
        eventName: 'Khet',
        coordinators: [
            { name: 'Susmita Das', dept: 'ECE', phone: '8584093033' },
            { name: 'Tiasa Bhaumik', dept: 'ECE', phone: '8910900719' },
        ],
        volunteers: ['Dibendu Paul (ECE)', 'Anushka Mukherjee (ECE 3)'],
    },
    {
        id: 'technomania-junior',
        eventName: 'Technomania Junior',
        coordinators: [
            { name: 'Safalya Pan', dept: 'ECE', phone: '9051347625' },
            { name: 'Apu Baidya', dept: 'IT', phone: '9051397106' },
        ],
        volunteers: ['Ankit Narayan Prasad (CSE 3)', 'Madhu Singh (IT 3)', 'Susmita Das (ECE 3)', 'Krantish Sasmal (ECE 3)', 'Samyak Sen (CSE 3)', 'Sayan Patra (EE 3)'],
    },
];
