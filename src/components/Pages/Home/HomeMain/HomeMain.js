import React, { Fragment } from 'react';

import About from '../../../Utilities/About/About';
import Services from '../../../Utilities/Services/Services';
import Cta from '../../../Utilities/Cta/Cta';
import Matches from '../../../Utilities/Matches/Matches';
import BlogOne from '../../../Utilities/Blog/BlogOne/BlogOne';
import HeroOne from '../../../Utilities/Hero/HeroOne/HeroOne';
import WorkGallery from '../../../Utilities/WorkGallery/WorkGallery';


const Home = () => {

    return (
        <Fragment>

            {/* Hero Component */}
            <HeroOne />

            {/* About Component */}
            <About />

            {/* Service Component */}
            <Services />

            {/* Gallery Component */}
            <WorkGallery/>

            {/* Cta Component */}
            <Cta />

            {/* Match Component */}
            <Matches />

            {/* Blog Component */}
            <BlogOne />

        </Fragment>
    );
}

export default Home;