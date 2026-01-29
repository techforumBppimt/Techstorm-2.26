import React from "react";
import Breadcrumb from "../../Utilities/Breadcrumb/Breadcrumb";
import Testimonial from "../../Utilities/Testimonial/Testimonial";
import Videos from "../../Utilities/Videos/Videos";

const LiveStreaming =()=>{
    return(
        <React.Fragment>
            <Breadcrumb pageTitle={'LIVE STREAMING'} currentPage={'LIVE STREAMING'} />
            <Videos/>
            <Testimonial/>
        </React.Fragment>
    );
}

export default LiveStreaming;