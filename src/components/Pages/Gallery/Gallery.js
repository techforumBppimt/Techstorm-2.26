import React from 'react';
import { Link } from 'react-router-dom';
import { cloudinaryImages } from '../../../config/cloudinary';
import bgImage from '../../../assets/img/bg/match-bg3.png';
import SectionTitle from '../../Utilities/SectionTitle/SectionTitle';

const img1 = cloudinaryImages.gallery.c1;
const img2 = cloudinaryImages.gallery.c2;
const img3 = cloudinaryImages.gallery.c3;
const img4 = cloudinaryImages.gallery.c4;
const img5 = cloudinaryImages.gallery.c5;
const img6 = cloudinaryImages.gallery.c6;
const img7 = cloudinaryImages.gallery.c7;
const img8 = cloudinaryImages.gallery.c8;
const img9 = cloudinaryImages.gallery.c9;
const img10 = cloudinaryImages.gallery.c10;
const img11 = cloudinaryImages.gallery.c11;
const img12 = cloudinaryImages.gallery.c12;
const img13 = cloudinaryImages.gallery.c13;
const img14 = cloudinaryImages.gallery.c14;

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
    {
        id: '9',
        thumb: img9
    },
    {
        id: '10',
        thumb: img10
    },
    {
        id: '11',
        thumb: img11
    },
    {
        id: '12',
        thumb: img12
    },
    {
        id: '13',
        thumb: img13
    },
    {
        id: '14',
        thumb: img14
    },
]
const Gallery = () => {
    return (
        <React.Fragment>
            <div style={{ 
                background: `url(${bgImage}) repeat`,
                minHeight: '100vh',
                paddingTop: '20px'
            }}>
                {/* Gallery */}
                <section id="work" className="pt-60 pb-90">
                    <div className="container">
                        <div className="row align-items-center mb-30">
                            <div className="col-lg-12">
                                <SectionTitle titlefirst='Gallery' titleSec='' />
                            </div>
                        </div>
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
            </div>
        </React.Fragment>
    );
}

export default Gallery;