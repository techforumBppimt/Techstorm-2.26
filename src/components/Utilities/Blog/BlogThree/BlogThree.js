import SectionTitle from "../../SectionTitle/SectionTitle";
import bgImg from '../../../../assets/img/bg/blog-bg2.png';
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

const BlogThree = () => {
    return (
        <section id="blog" className="blog-area style-two p-relative pt-120 pb-90 fix" style={{ background: `url(${bgImg}) no-repeat right bottom` }}>
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-12">
                        {/* Section title */}
                        <SectionTitle titlefirst="LATEST NEWS" titleSec="ARTICLES" className="text-center" />
                    </div>
                </div>
                <div className="row">
                    {/* Blog Card */}
                    <BlogCard blogData={blogData} />
                </div>
            </div>
        </section>
    )
}
export default BlogThree;