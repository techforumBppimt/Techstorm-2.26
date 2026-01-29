import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SectionTitle from "../SectionTitle/SectionTitle";

import bgImg from '../../../assets/img/bg/match-bg3.png';
import team1 from '../../../assets/img/matches/team1.png';
import team2 from '../../../assets/img/matches/team2.png';
import team3 from '../../../assets/img/matches/team3.png';
import team4 from '../../../assets/img/matches/team4.png';
import team5 from '../../../assets/img/matches/team5.png';
import team6 from '../../../assets/img/matches/team6.png';
import Match from "./Match";

const matchData = [
    {
        id: '1',
        avatar1: team1,
        avatar2: team2,
        time: '11: 30',
        date: '1st  October 2021'
    },
    {
        id: '2',
        avatar1: team3,
        avatar2: team4,
        time: '11: 30',
        date: '1st  October 2021'
    },
    {
        id: '3',
        avatar1: team5,
        avatar2: team6,
        time: '11: 30',
        date: '1st  October 2021'
    },
]
const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    autoplay: true,
    pauseOnHover: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1
};

const UpcomingMatch = () => {
    return (
        <section className="testimonial-area p-relative pt-120 pb-120"
            style={{ background: `url(${bgImg}) no-repeat center center / cover` }}>
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-12">
                        {/* Section title */}
                        <SectionTitle titlefirst='Upcoming' titleSec='Matches' />
                    </div>
                </div>
                <div className="macthe-active wow fadeInUp animated" data-animation="fadeInRight" data-delay=".4s">
                    <Slider {...settings}>
                        {
                            matchData.map(data => {
                                const { id, avatar1, avatar2, time, date } = data;
                                return <Match key={id}
                                    avatar1={avatar1}
                                    avatar2={avatar2}
                                    time={time}
                                    date={date} />
                            })
                        }
                    </Slider>
                </div>
            </div>
        </section>
    );
}
export default UpcomingMatch;