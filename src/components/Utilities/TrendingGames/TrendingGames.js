import SectionTitle from "../SectionTitle/SectionTitle";
import img1 from '../../../assets/img/gallery/protfolio-img01.png'
import img2 from '../../../assets/img/gallery/protfolio-img02.png'
import img3 from '../../../assets/img/gallery/protfolio-img03.png'
import GameCard from "./GameCard";

const TrendingData = [
    {
        id: '1',
        thumb: img1,
        tag: 'Origin',
        label: 'Bunny Officer',
        description: 'Duis aute irure dolor'
    },
    {
        id: '2',
        thumb: img2,
        tag: 'New',
        label: 'Wonderland',
        description: 'Duis aute irure dolor'
    },
    {
        id: '3',
        thumb: img3,
        tag: 'Origin',
        label: 'Wraith',
        description: 'Duis aute irure dolor'
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
                            titlefirst={'Trending'}
                            titleSec={'Games'}
                            className={'text-center'} />
                    </div>

                    <GameCard TrendingData={TrendingData} />

                </div>
            </div>
        </section>
    );
}
export default TrendingGames;