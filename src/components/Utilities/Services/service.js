const ServiceItem = ({ icon, title, description }) => {
    return (
        <div className="col-lg-4 col-md-6">
            <div className="services-box mb-30 wow fadeInUp" data-wow-delay=".2s">
                <div className="services-content2">
                    <div className="services-icon">
                        <i className={icon}></i>
                        <h5>{title}</h5>
                    </div>
                    <p>{description}</p>
                </div>
            </div>
        </div>
    );
}
export default ServiceItem;