import { Link } from 'react-router-dom';
import fullImg from '../../../assets/img/bg/video-img3.png';
const bigVdeo = {
    thumb: fullImg,
    URL: 'https://www.youtube.com/watch?v=7e90gBu4pas',
    label: 'Watch Dogs 2',
    description: 'Duis aute irure dolor i'
}

const FullVideo = () => {
    const { thumb, URL, label, description } = bigVdeo;
    return (
        <div className="video-full-img p-relative ">
            <img src={thumb} alt="circle_left" />
            <div className="play-btn">
                <Link to={URL} className="popup-video">
                    <i className="flaticon-play-button"></i>
                </Link>
                <h4>{label}</h4>
                <p>{description}</p>
            </div>
        </div>
    )
}
export default FullVideo;