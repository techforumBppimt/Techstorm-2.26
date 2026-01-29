import SectionTitle from '../SectionTitle/SectionTitle';
import bgImg from '../../../assets/img/bg/video-bg.png';
import FullVideo from './FullVideo';
import VideoList from './VideoList';


const Videos = () => {
    return (
        <section className="video-area p-relative pt-120 pb-100" style={{ background: `url(${bgImg}) no-repeat` }}>
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-12">
                        {/* Section title */}
                        <SectionTitle titlefirst='Checkout Live' titleSec='Streaming' />
                    </div>
                    <div className="col-lg-12">
                        <div className="video-grid wow fadeInDown animated" data-animation="fadeInRight" data-delay=".4s">
                            {/* Full video */}
                            <FullVideo />
                            {/* Video List */}
                            <VideoList />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Videos;