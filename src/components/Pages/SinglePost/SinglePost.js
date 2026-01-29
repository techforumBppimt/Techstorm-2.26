import React from "react";
import SideBar from "../../Utilities/Blog/ArchivePost/SideBar";
import Breadcrumb from "../../Utilities/Breadcrumb/Breadcrumb";

import PostNavigation from "../../Utilities/Blog/SinglePost/PostNavigation";
import RelatedPost from "../../Utilities/Blog/SinglePost/RelatedPost";
import AuthorInfo from "../../Utilities/Blog/SinglePost/AuthorInfo";
import PostContent from "../../Utilities/Blog/SinglePost/PostContent";
import Comments from "../../Utilities/Blog/SinglePost/Comments";
import CommentForm from "../../Utilities/Blog/SinglePost/CommentForm";

const SinglePost = () => {
    return (

        <React.Fragment>
            <Breadcrumb pageTitle={'blog details'} currentPage={'blog details'} />

            <section className="inner-blog b-details-p pb-90">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="blog-details-wrap">
                                {/* Post Content */}
                                <PostContent />

                                {/* Post Navigation */}
                                <PostNavigation />

                                {/* Related Post */}
                                <RelatedPost />

                                {/* Author */}
                                <AuthorInfo />

                                {/* Post comment */}
                                <Comments />

                                <CommentForm />

                            </div>
                        </div>
                        {/* Right sidebar */}
                        <SideBar />
                    </div>
                </div>
            </section>
        </React.Fragment>

    );
}

export default SinglePost;