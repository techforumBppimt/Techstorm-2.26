import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Breadcrumb from "../../Utilities/Breadcrumb/Breadcrumb";
import SectionTitle from "../../Utilities/SectionTitle/SectionTitle";


import workImg1 from '../../../assets/img/gallery/c1.jpeg';
import workImg2 from '../../../assets/img/gallery/c2.jpeg';
import workImg3 from '../../../assets/img/gallery/c3.jpeg';
import workImg4 from '../../../assets/img/gallery/c4.jpeg';
import workImg5 from '../../../assets/img/gallery/c5.jpeg';
import workImg6 from '../../../assets/img/gallery/c6.jpeg';
import workImg7 from '../../../assets/img/gallery/c7.jpeg';
import workImg8 from '../../../assets/img/gallery/c8.jpeg';
const gameItems = [
    {
        img: workImg1,
        tag: 'Origin',
        label: 'Bunny Officer',
        description: 'Duis aute irure dolor i',
        cat: 'Origin',
    },
    {
        img: workImg2,
        tag: 'New',
        label: 'Wonderland',
        description: 'Duis aute irure dolor i',
        cat: 'Origin',
    },
    {
        img: workImg3,
        tag: 'New',
        label: 'Apex Legends',
        description: 'Duis aute irure dolor i',
        cat: 'Playstation',
    },
    {
        img: workImg4,
        tag: 'Origin',
        label: 'Wraith',
        description: 'Duis aute irure dolor i',
        cat: 'Playstation',
    },
    {
        img: workImg5,
        tag: 'New',
        label: 'Apex Legends',
        description: 'Duis aute irure dolor i',
        cat: 'Steam',
    },
    {
        img: workImg6,
        tag: 'Origin',
        label: 'Wraith',
        description: 'Duis aute irure dolor i',
        cat: 'Steam',
    },
    {
        img: workImg7,
        tag: 'Origin',
        label: 'Wraith',
        description: 'Duis aute irure dolor i',
        cat: 'Uplay',
    },
    {
        img: workImg8,
        tag: 'New',
        label: 'Wonderland',
        description: 'Duis aute irure dolor i',
        cat: 'Uplay',
    },
]

const Games = () => {
    const [items, setItems] = useState(gameItems);


    const fliterItem = (cat) => {
        const filterUpdate = gameItems.filter((currentItem) => {
            return currentItem.cat === cat;
        })
        setItems(filterUpdate);
    }
    return (
        <React.Fragment>
            <Breadcrumb pageTitle={'Game'} currentPage={'Game'} />
            <section id="work" className="pb-120">
                <div className="container">
                    <div className="portfolio ">
                        <div className="row align-items-center mb-30 wow fadeInUp animated" data-animation="fadeInRight" data-delay=".4s">
                            <div className="col-lg-12">
                                <SectionTitle
                                    titlefirst='Trending'
                                    titleSec='Games' />
                            </div>
                            <div className="col-lg-12">
                                <div className="my-masonry wow fadeInDown animated" data-animation="fadeInRight" data-delay=".4s">
                                    <div className="button-group filter-button-group ">
                                        <button className="active" onClick={() => setItems(gameItems)}>{'All'}</button>
                                        <button onClick={() => fliterItem('Origin')}>
                                            {'Origin'}
                                        </button>
                                        <button onClick={() => fliterItem('Playstation')}>{'Playstation 4'}
                                        </button>
                                        <button onClick={() => fliterItem('Steam')}>
                                            {'Steam'}
                                        </button>
                                        <button onClick={() => fliterItem(['Uplay'])}>
                                            {'Uplay'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="grid col4">
                            {
                                items.map((item, index) => {
                                    const { img, tag, label, description } = item
                                    return (
                                        <div className="grid-item" key={index}>
                                            <Link to={img} className="popup-image">
                                                <figure className="gallery-image">
                                                    <img src={img} alt="img" className="img" />
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
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
}
export default Games;