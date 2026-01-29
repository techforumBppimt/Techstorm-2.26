import { Link } from 'react-router-dom';
import avatar from '../../../../assets/img/blog/comment/avatar.png'
const AuthorInfo = () => {
    return (

        <div className="avatar__wrap text-center mb-45">
            <div className="avatar-img">
                <img src={avatar} alt="" />
            </div>
            <div className="avatar__info">
                <h5>{'Rosalina William'}</h5>
                <div className="avatar__info-social">
                    <Link to={"#"}><i className="fab fa-facebook-f"></i></Link>
                    <Link to={"#"}><i className="fab fa-twitter"></i></Link>
                    <Link to={"#"}><i className="fab fa-instagram"></i></Link>
                    <Link to={"#"}><i className="fab fa-behance"></i></Link>
                    <Link to={"#"}><i className="fab fa-linkedin"></i></Link>
                </div>
            </div>
            <div className="avatar__wrap-content">
                <p>{'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequa aute irure dolor.'}</p>
            </div>
        </div>

    );
}

export default AuthorInfo;