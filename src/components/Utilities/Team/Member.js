import React from "react";

const Member = ({ teamData }) => {
    return (
        <React.Fragment>
            {
                teamData?.map(data => {
                    const { id, avatar, name, deg } = data;
                    return (
                        <div className="col-lg-4 col-md-6" key={id}>
                            <div className="single-team text-center mb-30 wow fadeInDown animated" data-animation="fadeInRight" data-delay=".4s">
                                <div className="team-thumb">
                                    <div className="brd">
                                        <img src={avatar} alt={'Avatar'} />
                                    </div>
                                    <div className="team-info">
                                        <h4>{name}</h4>
                                        <span>{deg}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </React.Fragment>
    );
}
export default Member;