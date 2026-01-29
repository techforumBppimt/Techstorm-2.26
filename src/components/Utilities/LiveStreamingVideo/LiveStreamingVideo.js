import React from 'react';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import vdoImg1 from '../../../assets/img/bg/video-img.png';
import vdoImg2 from '../../../assets/img/bg/video-img2.png';



const LiveStreamingVideo = () => {
    const streamingData = [
        {
            id: '1',
            bgImg: vdoImg1,
            url: 'https://www.youtube.com/watch?v=7e90gBu4pas',
            icon: 'fas fa-play',
            title: 'Checkout Live Streaming'
        },
        {
            id: '2',
            bgImg: vdoImg2,
            url: 'https://www.youtube.com/watch?v=7e90gBu4pas',
            icon: 'fas fa-play',
            title: 'Checkout Live Streaming'
        }
    ]

    const settings = {
        dots: true,
        arrows: true,
        infinite: true,
        autoplay: true,
        pauseOnHover: true,
        speed: 1500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    return (
        <React.Fragment>
            <div className="vedio video-active pt-90">

                <Slider {...settings}>
                    {
                        streamingData.map(data => {
                            const { id, bgImg, url, icon, title } = data;
                            return (
                                <div className="col-lg-12 col-md-12 col-sm-12" key={id}>
                                    <div className="s-video-wrap" style={{ background: `url(${bgImg})` }}>
                                        <div className="s-video-content">
                                            <Link to={url} className="popup-video mb-50">
                                                <i className={icon}></i>
                                            </Link>
                                            <h1>{title}</h1>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    }
                </Slider>

            </div>
        </React.Fragment>
    );
}

export default LiveStreamingVideo;