import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SectionTitle from '../../SectionTitle/SectionTitle';

import bgImg from '../../../../assets/img/bg/video-bg2.png';
import vdeoImg1 from '../../../../assets/img/bg/video-img8.png';
import vdeoImg2 from '../../../../assets/img/bg/video-img9.png';
import vdeoImg3 from '../../../../assets/img/bg/video-img10.png';

const videoData = [
    {
        id: '1',
        thumb: vdeoImg1,
        url: 'https://www.youtube.com/watch?v=7e90gBu4pas',
        label: 'Watch Dogs 2',
        description: 'Duis aute irure dolor'
    },
    {
        id: '2',
        thumb: vdeoImg2,
        url: 'https://www.youtube.com/watch?v=7e90gBu4pas',
        label: 'Watch Dogs 2',
        description: 'Duis aute irure dolor'
    },
    {
        id: '3',
        thumb: vdeoImg3,
        url: 'https://www.youtube.com/watch?v=7e90gBu4pas',
        label: 'Watch Dogs 2',
        description: 'Duis aute irure dolor'
    },
    {
        id: '4',
        thumb: vdeoImg1,
        url: 'https://www.youtube.com/watch?v=7e90gBu4pas',
        label: 'Watch Dogs 2',
        description: 'Duis aute irure dolor'
    },
]

const settings = {
    dots: false,
    arrows: false,
    infinite: false,
    autoplay: false,
    pauseOnHover: false,
    speed: 1500,
    slidesToShow: 3,
    slidesToScroll: 1
};

const LiveStreamingVideoTwo = () => {
    return (
        <section className="video-area p-relative pt-120 pb-50 fix" style={{ background: `url(${bgImg}) no-repeat` }}>
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-12">
                        {/* Section title */}
                        <SectionTitle titlefirst={'Checkout Live'} titleSec={'Streaming'} />
                    </div>
                </div>
            </div>
            <div className="container-fluid">
                <div className="row align-items-center">
                    <div className="col-lg-12">
                        <div className="vedio video-active2 pb-80  wow fadeInUp animated" data-animation="fadeInRight" data-delay=".4s">
                            <Slider {...settings}>
                                {
                                    videoData.map(data => {
                                        const { id, thumb, url, label, description } = data;
                                        return (
                                            <div className="video-grid px-2" key={id}>
                                                <div className="video-full-img  p-relative ">
                                                    <img src={thumb} alt="circle_left" />
                                                    <div className="play-btn">
                                                        <Link to={url} className="popup-video mb-50">
                                                            <i className="flaticon-play-button"></i>
                                                        </Link>
                                                        <h4>{label}</h4>
                                                        <p>{description}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </Slider>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
export default LiveStreamingVideoTwo;