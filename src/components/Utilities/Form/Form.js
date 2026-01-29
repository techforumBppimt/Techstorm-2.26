const Form = () => {
    return (
        <form method="post" className="contact-form mt-30">
            <div className="row">
                <div className="col-lg-12">
                    <div className="contact-field p-relative c-name mb-30">
                        <input type="text" id="firstn" name="firstn" placeholder="Your Name" required />
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="contact-field p-relative c-subject mb-30">
                        <input type="text" id="email" name="email" placeholder="Eamil" required />
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="contact-field p-relative c-subject mb-30">
                        <input type="text" id="subject" name="subject" placeholder="Subject" required />

                    </div>
                </div>
                <div className="col-lg-12">
                    <div className="contact-field p-relative c-message mb-30">
                        <textarea name="message" id="message" cols="30" rows="10" placeholder="Write comments"></textarea>
                    </div>
                    <div className="slider-btn">
                        <button className="btn ss-btn" data-animation="fadeInRight" data-delay=".8s">{'Submint Now'}</button>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default Form;