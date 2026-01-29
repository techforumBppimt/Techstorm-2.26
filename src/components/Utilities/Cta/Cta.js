import { Link } from 'react-router-dom';
import bgImg from '../../../assets/img/bg/divider-bg.png';
const ctaData = {
    bg: bgImg,
    title: 'Join Us As a Super Fans and Get all the Benefits',
    description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    btn: 'Join Now',
}
const Cta = () => {
    const { bg, title, description, btn } = ctaData;
    return (
        <section id="graph" className="features-area pt-120 pb-120" style={{ background: `url(${bg}) no-repeat` }}>
            <div className="container">
                <div className="row align-items-center text-center">
                    <div className="col-lg-12 col-md-12">
                        <div className="section-title cta-title  mb-20 wow fadeInUp animated" data-animation="fadeInRight" data-delay=".4s">
                            <div className="row justify-content-center">
                                <div className="col-xl-6 col-lg-8">
                                    <h2>{title}</h2>
                                </div>
                            </div>
                            <div className="row justify-content-center">
                                <div className="col-xl-11">
                                    <p>{description}</p>
                                </div>
                            </div>
                        </div>
                        <div className="slider-btn">
                            <Link to={'/contact'} className="btn ss-btn mt-20 wow fadeInDown animated" data-animation="fadeInRight" data-delay=".4s">{btn}</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Cta;