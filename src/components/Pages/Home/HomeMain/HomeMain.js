import React, { Fragment } from 'react';

import About from '../../../Utilities/About/About';
import Cta from '../../../Utilities/Cta/Cta';
import BlogOne from '../../../Utilities/Blog/BlogOne/BlogOne';
import HeroOne from '../../../Utilities/Hero/HeroOne/HeroOne';
import WorkGallery from '../../../Utilities/WorkGallery/WorkGallery';
import Carousel8bit from '../../../Utilities/LiveStreamingVideo/Carousel8bit/Carousel8bit';
import EventTicker from '../../../Utilities/EventTicker/EventTicker';


const Home = () => {

    return (
        <Fragment>

            {/* Hero Component */}
            <HeroOne />

            {/* Event Ticker */}
            <EventTicker />

            {/* About Component */}
            <About />

            {/* Gallery Component */}
            <WorkGallery/>

            {/* 8-bit Carousel Component */}
            <Carousel8bit />

            {/* Cta Component */}
            <Cta />

            {/* Blog Component */}
            <BlogOne />

        </Fragment>
    );
}

export default Home;