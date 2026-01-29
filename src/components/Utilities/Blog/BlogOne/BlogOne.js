import React from 'react';
import bgImg from '../../../../assets/img/bg/blog-bg.png';
import blogImg1 from '../../../../assets/img/blog/inner_b1.jpg';
import blogImg2 from '../../../../assets/img/blog/inner_b2.jpg';
import blogImg3 from '../../../../assets/img/blog/inner_b3.jpg';
import BlogCard from "../BlogCard";

const blogData = [
    {
        id: '1',
        thumb: blogImg1,
        title: 'The Walking Dead Season',
        admin: 'Admin',
        date: '24th March 2021',
        excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida.'
    },
    {
        id: '2',
        thumb: blogImg2,
        title: 'The Walking Dead Season',
        admin: 'Admin',
        date: '24th March 2021',
        excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida.'
    },
    {
        id: '3',
        thumb: blogImg3,
        title: 'The Walking Dead Season',
        admin: 'Admin',
        date: '24th March 2021',
        excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida.'
    },
];
const BlogOne = () => {
    return (
        <section id="blog" className="blog-area  p-relative pt-120 pb-120 fix" style={{ background: `url(${bgImg}) no-repeat right bottom` }}>
            <div className="container">
                <div className="row">
                    <BlogCard blogData={blogData} />
                </div>
            </div>
        </section>
    )
}
export default BlogOne;