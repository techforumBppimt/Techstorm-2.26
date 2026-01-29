import React from 'react';
import Breadcrumb from '../../Utilities/Breadcrumb/Breadcrumb';
import TeamTwo from '../../Utilities/Team/TeamTwo';

const Teams = () => {
    return (
        <React.Fragment>
            <Breadcrumb pageTitle={'Team'} currentPage={'Team'} />
            <TeamTwo />
        </React.Fragment>
    );
}

export default Teams;