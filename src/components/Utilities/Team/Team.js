import SectionTitle from "../SectionTitle/SectionTitle";
import team1 from '../../../assets/img/team/team_img02.png';
import team2 from '../../../assets/img/team/team_img03.png';
import team3 from '../../../assets/img/team/team_img04.png';
import team4 from '../../../assets/img/team/team_img05.png';
import team5 from '../../../assets/img/team/team_img06.png';
import team6 from '../../../assets/img/team/team_img07.png';
import Member from "./Member";

const teamData = [
    {
        id: '1',
        avatar: team1,
        name: 'Nashid Martines',
        deg: 'Founder'
    },
    {
        id: '2',
        avatar: team2,
        name: 'Konne Backfield',
        deg: 'CEO'
    },
    {
        id: '3',
        avatar: team3,
        name: 'Hackson Willing',
        deg: 'Developer'
    },
    {
        id: '4',
        avatar: team4,
        name: 'Rosalina D. William',
        deg: 'Developer'
    },
    {
        id: '5',
        avatar: team5,
        name: 'Bobby Ballard',
        deg: 'Developer'
    },
    {
        id: '6',
        avatar: team6,
        name: 'Steven Cortez',
        deg: 'Developer'
    },
]

const Team = () => {
    return (
        <section id="team" className="team-area2 pb-120">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 p-relative">
                        <SectionTitle titlefirst='Our Experts' titleSec='Team' />
                    </div>
                </div>
                <div className="row ">
                    <Member teamData={teamData} />
                </div>
            </div>
        </section>
    );
}
export default Team;