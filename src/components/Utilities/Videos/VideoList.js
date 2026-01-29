import { Link } from 'react-router-dom';
import video1Img from '../../../assets/img/bg/video-img4.png';
import video2Img from '../../../assets/img/bg/video-img5.png';
import video3Img from '../../../assets/img/bg/video-img6.png';
import video4Img from '../../../assets/img/bg/video-img7.png';

const vdeoList = [
    {
        id: '1',
        thumb: video1Img,
        URL: 'https://www.youtube.com/watch?v=7e90gBu4pas',
        label: 'Watch Dogs 2',
        description: 'Duis aute irure dolor i'
    },
    {
        id: '2',
        thumb: video2Img,
        URL: 'https://www.youtube.com/watch?v=7e90gBu4pas',
        label: 'Watch Dogs 2',
        description: 'Duis aute irure dolor i'
    },
    {
        id: '3',
        thumb: video3Img,
        URL: 'https://www.youtube.com/watch?v=7e90gBu4pas',
        label: 'Watch Dogs 2',
        description: 'Duis aute irure dolor i'
    },
    {
        id: '4',
        thumb: video4Img,
        URL: 'https://www.youtube.com/watch?v=7e90gBu4pas',
        label: 'Watch Dogs 2',
        description: 'Duis aute irure dolor i'
    },
]

const VideoList = () => {
    return (
        <ul>
            {
                vdeoList.map(data => {
                    const { id, thumb, URL, label, description } = data;
                    return (
                        <li key={id}>
                            <div className="video-tumb p-relative ">
                                <div className="img">
                                    <img src={thumb} alt="circle_left" />
                                    <div className="play-btn">
                                        <Link to={URL} className="popup-video">
                                            <i className="flaticon-play-button"></i>
                                        </Link>
                                    </div>
                                </div>
                                <div className="text">
                                    <h4>{label}</h4>
                                    <p>{description}</p>
                                </div>
                            </div>
                        </li>
                    )
                })
            }

        </ul>
    )
}
export default VideoList;