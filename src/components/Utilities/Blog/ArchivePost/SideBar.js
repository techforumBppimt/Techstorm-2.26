import { Link } from "react-router-dom";

const categories = [
    {
        cat: 'Branding',
        psotNumber: '4'
    },
    {
        cat: 'Corporat',
        psotNumber: '5'
    },
    {
        cat: 'Design',
        psotNumber: '3'
    },
    {
        cat: 'Gallery',
        psotNumber: '3'
    },
]
const recentPosts = [
    {
        psotTitle: 'User Experience Psychology And Performance Smshing',
        psotDate: 'August 19, 2020'
    },
    {
        psotTitle: 'Monthly Web Development Up Cost Of JavaScript',
        psotDate: 'August 19, 2020'
    },
    {
        psotTitle: 'There are many variation passages of like available.',
        psotDate: 'August 19, 2020'
    },
]

const tags = [
    {
        tag: 'app',
        fz: '8pt'
    },
    {
        tag: 'Branding',
        fz: '8pt'
    },
    {
        tag: 'corporat',
        fz: '8pt'
    },
    {
        tag: 'Design',
        fz: '16.4pt'
    },
    {
        tag: 'gallery',
        fz: '22pt'
    },
    {
        tag: 'video',
        fz: '8pt'
    },
    {
        tag: 'web design',
        fz: '16.4pt'
    },
]
const SideBar = () => {
    return (

        <div className="col-sm-12 col-md-12 col-lg-4">
            <aside className="sidebar-widget">
                <section id="search-3" className="widget widget_search">
                    <h2 className="widget-title">{'Search'}</h2>
                    <form role="search" method="get" className="search-form">
                        <label>
                            <span className="screen-reader-text">{'Search for:'}</span>
                            <input type="search" className="search-field" placeholder="Search &hellip;" value="" name="s" />
                        </label>
                        <input type="submit" className="search-submit" value="Search" />
                    </form>
                </section>
                <section id="custom_html-5" className="widget_text widget widget_custom_html">
                    <h2 className="widget-title">{'Follow Us'}</h2>
                    <div className="textwidget custom-html-widget">
                        <div className="widget-social">
                            <Link to={'#'}><i className="fab fa-twitter"></i></Link>
                            <Link to={'#'}><i className="fab fa-pinterest-p"></i></Link>
                            <Link to={'#'}><i className="fab fa-facebook-f"></i></Link>
                            <Link to={'#'}><i className="fab fa-instagram"></i></Link>
                            <Link to={'#'}><i className="fab fa-wordpress"></i></Link>
                        </div>
                    </div>
                </section>
                <section id="categories-1" className="widget widget_categories">
                    <h2 className="widget-title">{'Categories'}</h2>
                    <ul>
                        {
                            categories.map((data, index) => {
                                const { cat, psotNumber } = data;
                                return (
                                    <li key={index} className="cat-item cat-item-16">
                                        <Link to={'#'}>{cat}</Link> ({psotNumber})
                                    </li>
                                );
                            })
                        }
                    </ul>
                </section>
                <section id="recent-posts-4" className="widget widget_recent_entries">
                    <h2 className="widget-title">{'Recent Posts'}</h2>
                    <ul>
                        {
                            recentPosts.map((data, index) => {
                                const { psotTitle, psotDate } = data;
                                return (
                                    <li key={index}> <Link to={'#'}>{psotTitle}</Link>
                                        <span className="post-date">{psotDate}</span>
                                    </li>
                                );
                            })
                        }
                    </ul>
                </section>
                <section id="tag_cloud-1" className="widget widget_tag_cloud">
                    <h2 className="widget-title">{'Tag'}</h2>
                    <div className="tagcloud">
                        {
                            tags.map((data, index) => {
                                const { tag, fz } = data;
                                return (
                                    <Link key={index} to={'#'} className="tag-cloud-link tag-link-28 tag-link-position-1" style={{ fontSize: `${fz}` }} >
                                        {tag}
                                    </Link>
                                )
                            })
                        }
                    </div>
                </section>
            </aside>
        </div>

    );
}

export default SideBar;