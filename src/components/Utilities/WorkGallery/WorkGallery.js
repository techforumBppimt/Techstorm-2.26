import React, { useState } from 'react';
import { Link } from "react-router-dom";

import bgImg from '../../../assets/img/bg/trendiang-bg.png';


import SectionTitle from '../SectionTitle/SectionTitle';
import LiveStreamingVideo from '../LiveStreamingVideo/LiveStreamingVideo';

import workImg1 from '../../../assets/img/gallery/protfolio-img01.png';
import workImg2 from '../../../assets/img/gallery/protfolio-img02.png';
import workImg3 from '../../../assets/img/gallery/protfolio-img03.png';
import workImg4 from '../../../assets/img/gallery/protfolio-img04.png';

const galleryItems = [
    {
        id: '1',
        img: workImg1,
        tag: 'Origin',
        label: 'Bunny Officer',
        description: 'Duis aute irure dolor i',
        cat: 'Origin',
    },
    {
        id: '2',
        img: workImg2,
        tag: 'New',
        label: 'Wonderland',
        description: 'Duis aute irure dolor i',
        cat: 'Playstation',
    },
    {
        id: '3',
        img: workImg3,
        tag: 'New',
        label: 'Apex Legends',
        description: 'Duis aute irure dolor i',
        cat: 'Uplay',
    },
    {
        id: '4',
        img: workImg4,
        tag: 'Origin',
        label: 'Wraith',
        description: 'Duis aute irure dolor i',
        cat: 'Steam',
    },
]

const WorkGallery = () => {
    const [items, setItems] = useState(galleryItems);


    const fliterItem = (cat) => {
        const filterUpdate = galleryItems.filter((currentItem) => {
            return currentItem.cat === cat;
        })
        setItems(filterUpdate);
    }


    return (
        <section id="work" className="pt-120 pb-120" style={{ background: `url(${bgImg}) no-repeat` }}>
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
                                    <button className="active" onClick={() => setItems(galleryItems)}>All</button>
                                    <button onClick={() => fliterItem('Origin')}>
                                        {'Origin'}
                                    </button>
                                    <button onClick={() => fliterItem('Playstation')}>
                                        {'Playstation 4'}
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
                            items.map(item => {
                                const { id, img, tag, label, description } = item
                                return (
                                    <div className="grid-item" key={id}>
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
                <LiveStreamingVideo />
            </div>
        </section>
    );
}


export default WorkGallery;