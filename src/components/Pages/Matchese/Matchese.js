import React from "react";
import Breadcrumb from "../../Utilities/Breadcrumb/Breadcrumb";
import Matches from "../../Utilities/Matches/Matches";

const Matchese =()=>{
    return(

    <React.Fragment>
            <Breadcrumb pageTitle={'Matches'} currentPage={'Matches'} />
            <Matches/>
    </React.Fragment>

    );
}

export default Matchese;