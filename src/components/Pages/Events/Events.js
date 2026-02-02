import React, { Fragment } from 'react';

import Matches from '../../Utilities/Matches/Matches';
import bgImage from '../../../assets/img/bg/match-bg3.png';


const Events = () => {

    return (
        <Fragment>
            <div style={{ 
                background: `url(${bgImage}) repeat`,
                minHeight: '100vh',
                paddingTop: '20px'
            }}>
                {/* Featured Events Component */}
                <Matches />
            </div>
        </Fragment>
    );
}

export default Events;
