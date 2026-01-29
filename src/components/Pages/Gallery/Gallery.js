import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../Utilities/Breadcrumb/Breadcrumb';

import img1 from '../../../assets/img/gallery/protfolio-img01.png';
import img2 from '../../../assets/img/gallery/protfolio-img02.png';
import img3 from '../../../assets/img/gallery/protfolio-img03.png';
import img4 from '../../../assets/img/gallery/protfolio-img04.png';
import img5 from '../../../assets/img/gallery/protfolio-img05.png';
import img6 from '../../../assets/img/gallery/protfolio-img06.png';
import img7 from '../../../assets/img/gallery/protfolio-img07.png';
import img8 from '../../../assets/img/gallery/protfolio-img08.png';

const galleryImgs = [
    {
        id: '1',
        thumb: img1
    },
    {
        id: '2',
        thumb: img2
    },
    {
        id: '3',
        thumb: img3
    },
    {
        id: '4',
        thumb: img4
    },
    {
        id: '5',
        thumb: img5
    },
    {
        id: '6',
        thumb: img6
    },
    {
        id: '7',
        thumb: img7
    },
    {
        id: '8',
        thumb: img8
    },
]
const Gallery = () => {
    return (
        <React.Fragment>

            {/* Breadcrumb */}
            <Breadcrumb pageTitle={'Gallery'} currentPage={'Gallery'} />

            {/* Gallery */}
            <section id="work" className="pb-90">
                <div className="container">
                    <div className="portfolio">
                        <div className="grid col4">
                            {
                                galleryImgs.map(data => {
                                    const { id, thumb } = data;
                                    return (
                                        <div className="grid-item p-relative" key={id}>
                                            <div className="box">
                                                <Link to={thumb} className="popup-image">
                                                    <img src={thumb} alt="protfolio" />
                                                </Link>
                                            </div>
                                            <Link to={thumb} className="popup-image box-hover">
                                                <i className="fas fa-search"></i>
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

export default Gallery;