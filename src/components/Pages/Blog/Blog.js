import React from "react";
import { Link } from "react-router-dom";
import PostPagination from "../../Utilities/Blog/ArchivePost/PostPagination";
import SideBar from "../../Utilities/Blog/ArchivePost/SideBar";
import Breadcrumb from "../../Utilities/Breadcrumb/Breadcrumb";

import postThumb1 from '../../../assets/img/blog/inner_b1.jpg';
import postThumb2 from '../../../assets/img/blog/inner_b2.jpg';
import postThumb3 from '../../../assets/img/blog/inner_b3.jpg';

const psots = [
    {
        thumb: postThumb1,
        admin: 'by Hetmayar',
        psotTitle: 'Lorem ipsum dolor sit amet, consectetur cing elit, sed do eiusmod tempor.',
        excerpt: "Novia's spaciously two bedroom apartments are perfect for families and even business partners.Look out into the Manhattan skyline from the open fully equipped kitchen",
        views: '100 Views',
        comments: '35 Comments',
        date: '24th March 2019'
    },
    {
        thumb: postThumb2,
        admin: 'by Hetmayar',
        psotTitle: 'Lorem ipsum dolor sit amet, consectetur cing elit, sed do eiusmod tempor.',
        excerpt: "Novia's spaciously two bedroom apartments are perfect for families and even business partners.Look out into the Manhattan skyline from the open fully equipped kitchen",
        views: '100 Views',
        comments: '35 Comments',
        date: '24th March 2019'
    },
    {
        thumb: postThumb3,
        admin: 'by Hetmayar',
        psotTitle: 'Lorem ipsum dolor sit amet, consectetur cing elit, sed do eiusmod tempor.',
        excerpt: "Novia's spaciously two bedroom apartments are perfect for families and even business partners.Look out into the Manhattan skyline from the open fully equipped kitchen",
        views: '100 Views',
        comments: '35 Comments',
        date: '24th March 2019'
    },
    {
        thumb: postThumb1,
        admin: 'by Hetmayar',
        psotTitle: 'Lorem ipsum dolor sit amet, consectetur cing elit, sed do eiusmod tempor.',
        excerpt: "Novia's spaciously two bedroom apartments are perfect for families and even business partners.Look out into the Manhattan skyline from the open fully equipped kitchen",
        views: '100 Views',
        comments: '35 Comments',
        date: '24th March 2019'
    },
]

const BlogPost = () => {

    return (
        <React.Fragment>
            <Breadcrumb pageTitle={'Blog'} currentPage={'Blog'} />

            <section className="inner-blog pb-90">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            {
                                psots.map((data, index) => {
                                    const { thumb, admin, psotTitle, excerpt, views, comments, date } = data;
                                    return (
                                        <div className="bsingle__post mb-50" key={index}>
                                            <div className="bsingle__post-thumb">
                                                <img src={thumb} alt="" />
                                            </div>
                                            <div className="bsingle__content">
                                                <div className="admin">
                                                    <Link to={'#'}>
                                                        <i className="far fa-user"></i>
                                                        {admin}
                                                    </Link>
                                                </div>
                                                <h2>
                                                    <Link to={'/single-post'}>{psotTitle}</Link>
                                                </h2>
                                                <p>{excerpt}</p>
                                                <div className="meta-info">
                                                    <ul>
                                                        <li>
                                                            <i className="fal fa-eye"></i>
                                                            {views}
                                                        </li>
                                                        <li>
                                                            <i className="fal fa-comments"></i>
                                                            {comments}
                                                        </li>
                                                        <li>
                                                            <i className="fal fa-calendar-alt"></i>
                                                            {date}
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            }


                            <PostPagination />
                        </div>
                        {/* Right Sidebar */}
                        <SideBar />
                    </div>
                </div>
            </section>
        </React.Fragment>
    );

}
export default BlogPost;