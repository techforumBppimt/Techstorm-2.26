import SectionTitle from "../SectionTitle/SectionTitle";
import img1 from '../../../assets/img/gallery/c1.jpeg'
import img2 from '../../../assets/img/gallery/c2.jpeg'
import img3 from '../../../assets/img/gallery/c3.jpeg'
import GameCard from "./GameCard";

const TrendingData = [
    {
        id: '1',
        thumb: img1,
        tag: 'Coding',
        label: 'Hack Storm',
        description: '24-hr Hackathon'
    },
    {
        id: '2',
        thumb: img2,
        tag: 'Robotics',
        label: 'Ro-Combat',
        description: 'Robot Battle Arena'
    },
    {
        id: '3',
        thumb: img3,
        tag: 'Gaming',
        label: 'Forza Horizon',
        description: 'Racing Championship'
    },
]

const TrendingGames = () => {
    return (
        <section id="work" className="pt-120 pb-65" style={{ background: '#1a0e22' }}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        {/* Section title */}
                        <SectionTitle
                            titlefirst={'Popular'}
                            titleSec={'Events'}
                            className={'text-center'} />
                    </div>

                    <GameCard TrendingData={TrendingData} />

                </div>
            </div>
        </section>
    );
}
export default TrendingGames;