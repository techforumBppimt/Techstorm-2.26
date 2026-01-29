import React,{Fragment} from 'react';
import BlogTwo from '../../../Utilities/Blog/BlogTwo/BlogTwo';
import Brands from '../../../Utilities/Brands/Brands';
import HeroTwo from '../../../Utilities/Hero/HeroTwo/HeroTwo';
import Instagram from '../../../Utilities/Instagram/Instagram';
import Matches from '../../../Utilities/Matches/Matches';
import Testimonial from '../../../Utilities/Testimonial/Testimonial';
import UpComingGame from '../../../Utilities/UpComingGame/UpComingGame';
import Videos from '../../../Utilities/Videos/Videos';


const HomeTwo = () => {

    return (
        <Fragment>

            {/* Hero component */}
            <HeroTwo />

            {/* Game component */}
            <UpComingGame />

            {/* Testimonial component */}
            <Testimonial />

            {/* Video component */}
            <Videos />

            {/* Upcoming mathace component */}
            <Matches />

            {/* Brand component */}
            <Brands />

            {/* Blog component */}
            <BlogTwo />

            {/* Blog component */}
            <Instagram/>

        </Fragment>
    );
}

export default HomeTwo;