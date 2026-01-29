import igImg1 from '../../../assets/img/bg/ins-img01.png';
import igImg2 from '../../../assets/img/bg/ins-img02.png';
import igImg3 from '../../../assets/img/bg/ins-img03.png';
import igImg4 from '../../../assets/img/bg/ins-img04.png';
import igImg5 from '../../../assets/img/bg/ins-img05.png';
import igImg6 from '../../../assets/img/bg/ins-img06.png';


const igData = [
    {
        id: '1',
        thumb: igImg1
    },
    {
        id: '2',
        thumb: igImg2
    },
    {
        id: '3',
        thumb: igImg3
    },
    {
        id: '4',
        thumb: igImg4
    },
    {
        id: '5',
        thumb: igImg5
    },
    {
        id: '6',
        thumb: igImg6
    },
]

const Instagram = () => {
    return (
        <section className="insg-area p-relative fix">
            <div className="container-fliud">
                <div className="row align-items-center">
                    <div className="col-lg-12 p-0">
                        <div className="insg-grid">
                            <ul>
                                {
                                    igData.map(data => {
                                        return (
                                            <li key={data.id}>
                                                <div className="insg-tumb  p-relative ">
                                                    <div className="img">
                                                        <img src={data.thumb} alt="circle_left" />
                                                    </div>
                                                </div>
                                            </li>
                                        );
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Instagram;