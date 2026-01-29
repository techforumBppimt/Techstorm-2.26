import { Link } from 'react-router-dom';
import img3 from '../../../../assets/img/blog/b_details03.jpg'
import img4 from '../../../../assets/img/blog/b_details04.jpg'
const RelatedPost = () => {

    return (
        <div className="related__post mt-45 mb-85">
            <div className="post-title">
                <h4>{'Related Post'}</h4>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="related-post-wrap mb-30">
                        <div className="post-thumb">
                            <img src={img3} alt="" />
                        </div>
                        <div className="rp__content">
                            <h3>
                                <Link to={'#'}>{'A series of iOS 7 inspire vector icons.'}</Link>
                            </h3>
                            <p>{'Lorem ipsum dolor sit amet, consectet ur adipisicing elit, sed do eiusmod temp or incididunt ut labore et dolore.'}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="related-post-wrap mb-30">
                        <div className="post-thumb">
                            <img src={img4} alt="" />
                        </div>
                        <div className="rp__content">
                            <h3><Link to={'#'}>{'Sed ut perspiciatis unde omnis.'}</Link></h3>
                            <p>{'Lorem ipsum dolor sit amet, consectet ur adipisicing elit, sed do eiusmod temp or incididunt ut labore et dolore.'}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default RelatedPost;