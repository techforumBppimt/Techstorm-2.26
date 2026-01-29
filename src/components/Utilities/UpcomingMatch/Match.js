const Match = ({  avatar1, avatar2, time, date }) => {
    return (
        <div className="macthe-box macthe-box2">
            <div className="row align-items-center">
                <div className="col-lg-5">
                    <div className="team">
                        <img src={avatar1} alt="left" />
                        <div className="text">
                            <h4>{time}</h4>
                            <span>{date}</span>
                        </div>
                    </div>
                </div>
                <div className="col-lg-2">
                    <div className="match-time text-center">
                        <h3>{'VS'}</h3>
                    </div>
                </div>
                <div className="col-lg-5">
                    <div className="team2">
                        <img src={avatar2} alt="left" />
                        <div className="text">
                            <h4>{time}</h4>
                            <span>{date}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}
export default Match;