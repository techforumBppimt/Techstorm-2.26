import { Link } from "react-router-dom";
import blogIcon from '../../../../assets/img/icon/c_d01.png'

const PostNavigation =()=>{

    return(

        <div className="posts_navigation pt-35 pb-35">
            <div className="row align-items-center">
                <div className="col-xl-4 col-md-5">
                    <div className="prev-link">
                        <span>{'Prev Post'}</span>
                        <h4><Link to={'#'}>{'Tips Minimalist'}</Link></h4>
                    </div>
                </div>
                <div className="col-xl-4 col-md-2 text-left text-md-center">
                    <Link to={'/blog'} className="blog-filter">
                        <img src={blogIcon} alt="" />
                    </Link>
                </div>
                <div className="col-xl-4 col-md-5">
                    <div className="next-link text-left text-md-right">
                        <span>{'next Post'}</span>
                        <h4><Link to={'#'}>{'Less Is More'}</Link></h4>
                    </div>
                </div>
            </div>
        </div>

    );

}

export default PostNavigation;