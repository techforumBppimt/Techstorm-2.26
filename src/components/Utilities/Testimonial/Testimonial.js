import SectionTitle from "../SectionTitle/SectionTitle";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import quote from '../../../assets/img/testimonial/qt-icon.png';
import avatar1 from '../../../assets/img/testimonial/testi_avatar.png';
import avatar2 from '../../../assets/img/testimonial/testi_avatar2.png';

const testimonial = [
    {
        id: '1',
        qt: quote,
        description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        avatar: avatar1,
        name: 'Eity Akhter',
        deg: 'Gamer',
    },
    {
        id: '2',
        qt: quote,
        description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        avatar: avatar2,
        name: 'Birdie Stehnans',
        deg: 'Gamer',
    },
    {
        id: '3',
        qt: quote,
        description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        avatar: avatar1,
        name: 'Alicia Wolfe',
        deg: 'Gamer',
    },
]

const Testimonial = () => {
    const settings = {
        dots: false,
        arrows: false,
        infinite: false,
        autoplay: false,
        pauseOnHover: false,
        speed: 1500,
        slidesToShow: 2,
        slidesToScroll: 1
    };

    return (
        <section className="testimonial-area p-relative pb-50">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-12">
                        {/* section title */}
                        <SectionTitle
                            titlefirst='Testimo'
                            titleSec='nial'
                            className='text-center' />
                    </div>

                    <div className="col-lg-12">
                        <div className="testimonial-active wow fadeInDown animated" data-animation="fadeInRight" data-delay=".4s">
                            <Slider {...settings}>
                                {
                                    testimonial.map(data => {
                                        const { id, qt, description, avatar, name, deg } = data;
                                        return (
                                            <div className="single-testimonial" key={id}>
                                                <div className="qt-img">
                                                    <img src={qt} alt={'Icon'} />
                                                </div>
                                                <p>{description}</p>
                                                <div className="testi-author">
                                                    <img src={avatar} alt={'Avatar'} />
                                                    <div className="ta-info">
                                                        <h6>{name}</h6>
                                                        <span>{deg}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                }
                            </Slider>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Testimonial;