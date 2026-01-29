import React from 'react';
import { Link } from "react-router-dom";
const GameCard = ({ TrendingData }) => {
    return (
        <React.Fragment>
            {
                TrendingData?.map(data => {
                    const { id, thumb, tag, label, description } = data;
                    return (
                        <div key={id} className="col-lg-4 col-md-6  wow fadeInDown animated" data-animation="fadeInRight" data-delay=".4s">
                            <Link to={thumb} className="popup-image">
                                <figure className="gallery-image">
                                    <img src={thumb} alt="img" className="img" />
                                    <figcaption>
                                        <span>{tag}</span>
                                        <h4>{label}</h4>
                                        <p>{description}</p>
                                    </figcaption>
                                </figure>
                            </Link>
                        </div>

                    )
                })
            }
        </React.Fragment>
    );
}
export default GameCard;