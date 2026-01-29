import { Link } from "react-router-dom";

import comment1 from '../../../../assets/img/blog/comment/c_01.png'
import comment2 from '../../../../assets/img/blog/comment/c_02.png'
import comment3 from '../../../../assets/img/blog/comment/c_03.png'

const Comments = () => {
    
    return (
        <div className="comment__wrap pb-45">
            <div className="comment__wrap-title">
                <h5>{'Comments'}</h5>
            </div>
            <div className="single__comment mb-35">
                <div className="comments-avatar">
                    <img src={comment1} alt="" />
                </div>
                <div className="comment-text">
                    <div className="avatar-name mb-15">
                        <h6>{'ALina Kelian'}</h6>
                        <span>{'19th May 2018'}</span>
                        <Link to={"#"} className="comment-reply">
                            <i className="fas fa-reply"></i>{'Reply'}
                        </Link>
                    </div>
                    <p>{'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'}</p>
                </div>
            </div>
            <div className="single__comment children mb-35">
                <div className="comments-avatar">
                    <img src={comment2} alt="" />
                </div>
                <div className="comment-text">
                    <div className="avatar-name mb-15">
                        <h6>
                            {'Rlex Kelian'}
                            <i className="fas fa-bookmark"></i>
                        </h6>
                        <span>{'19th May 2018'}</span>
                        <Link to={"#"} className="comment-reply">
                            <i className="fas fa-reply"></i>{'Reply'}
                        </Link>
                    </div>
                    <p>{'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip commodo.'}</p>
                </div>
            </div>
            <div className="single__comment">
                <div className="comments-avatar">
                    <img src={comment3} alt="" />
                </div>
                <div className="comment-text">
                    <div className="avatar-name mb-15">
                        <h6>{'Roboto Alex'}</h6>
                        <span>{'21th May 2018'}</span>
                        <Link to={"#"} className="comment-reply">
                            <i className="fas fa-reply"></i>{'Reply'}
                        </Link>
                    </div>
                    <p>{'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'}</p>
                </div>
            </div>
        </div>
    );

}

export default Comments;