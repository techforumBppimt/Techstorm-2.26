const CommentForm = () => {
    return (
        <div id="comments" className="comments-area  mt-45">
            <div id="respond" className="comment-respond">
                <h3 id="reply-title" className="comment-reply-title">
                    {'Leave a Reply'}
                </h3>
                <form method="post" id="commentform" className="comment-form">
                    <p className="comment-notes">
                        <span id="email-notes">
                            {'Your email address will not be published.'}
                        </span>
                        {'Required fields are marked'}
                        <span className="required">{'*'}</span>
                    </p>
                    <p className="comment-field">
                        <i className="fas fa-user"></i>
                        <input id="author" placeholder="Your Name" name="author" type="text" />
                    </p>
                    <p className="comment-field">
                        <i className="fas fa-envelope"></i>
                        <input id="email" placeholder="your-real-email@example.com" name="email" type="text" />
                    </p>
                    <p className="comment-field">
                        <i className="fas fa-globe"></i>
                        <input id="url" name="url" placeholder="http://yoursitename.com" type="text" />
                    </p>
                    <p className="comment-form-comment">
                        <label for="comment">{'Comment'}</label>
                        <textarea id="comment" name="comment" cols="45" rows="8" maxlength="65525" required="required"></textarea>
                    </p>
                    <p className="form-submit">
                        <input name="submit" type="submit" id="submit" className="submit" value="Post Comment" />
                        <input type="hidden" name="comment_post_ID" value="2112" id="comment_post_ID" />
                        <input type="hidden" name="comment_parent" id="comment_parent" value="0" />
                    </p>
                </form>
            </div>
        </div>
    );
}

export default CommentForm;