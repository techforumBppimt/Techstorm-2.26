import aboutBgImg from '../../../assets/img/bg/about-bg.png';
import Button8bit from '../Button/Button8bit';
import experienceImg from '../../../assets/img/features/experience-years.png';
import features1 from '../../../assets/img/features/about-img1.jpg';
import features2 from '../../../assets/img/features/about-img2.jpg';
import features3 from '../../../assets/img/features/about-img3.png';
import SectionTitle from '../SectionTitle/SectionTitle';

const About = () => {
    return (
        <section id="about" className="about-area about-p pt-70 pb-140 p-relative" style={{ background: `url(${aboutBgImg}) no-repeat center center / cover` }}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-md-12 col-sm-12">
                        <div className="s-about-img p-relative wow fadeInLeft" data-wow-delay=".4s">
                            <div className="experience-years wow fadeInDown" data-wow-delay=".4s">
                                <img src={experienceImg} alt="Experience Years" />
                                <span>{'1st'}</span>
                            </div>
                            <img src={features1} alt="TechStorm fest" />
                            <div className="about-image2 wow fadeInUp" data-wow-delay=".4s">
                                <img src={features2} alt="Retro arcade" />
                            </div>
                            <div className="about-image3 wow fadeInUp" data-wow-delay=".6s">
                                <img src={features3} alt="Tech competition" />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12">
                        <div className="about-content s-about-content wow fadeInRight" data-wow-delay=".4s">
                            <SectionTitle
                                titlefirst={'About TechStorm'}
                                titleSec={'2026'}
                                className={'about-title second-title'}
                            />
                            
                            {/* NES.css Message Balloons */}
                            <div className="nes-container is-dark with-title" style={{
                                background: 'rgba(26, 14, 34, 0.9)',
                                border: '4px solid #ffc010',
                                marginBottom: '30px'
                            }}>
                                <p className="title" style={{
                                    background: '#1a0e22',
                                    color: '#ffc010',
                                    fontFamily: 'Press Start 2P, Minecraft, monospace',
                                    fontSize: '12px',
                                    padding: '5px 15px'
                                }}>Event Info</p>
                                
                                <div className="message-list">
                                    <div className="message -left" style={{ marginBottom: '20px' }}>
                                        <i className="nes-mario" style={{ 
                                            fontSize: '32px'
                                        }}></i>
                                        <div className="nes-balloon from-left is-dark" style={{
                                            background: '#2d1b3d',
                                            border: '4px solid #ffc010',
                                            color: '#ffd966',
                                            maxWidth: '400px'
                                        }}>
                                            <p style={{ 
                                                fontFamily: 'Minecraft, monospace',
                                                fontSize: '13px',
                                                margin: 0
                                            }}>
                                                Welcome to TechStorm 2026! Where pixels meet passion and retro gaming collides with cutting-edge tech!
                                            </p>
                                        </div>
                                    </div>

                                    <div className="message -right" style={{ marginBottom: '20px' }}>
                                        <div className="nes-balloon from-right is-dark" style={{
                                            background: '#2d1b3d',
                                            border: '4px solid #ffc010',
                                            color: '#ffd966',
                                            maxWidth: '400px'
                                        }}>
                                            <p style={{ 
                                                fontFamily: 'Minecraft, monospace',
                                                fontSize: '13px',
                                                margin: 0
                                            }}>
                                                Press START to join 15+ events including Coding, Robotics, Gaming, and Creative competitions!
                                            </p>
                                        </div>
                                        <i className="nes-ash" style={{ 
                                            fontSize: '32px'
                                        }}></i>
                                    </div>

                                    <div className="message -left">
                                        <i className="nes-kirby" style={{ 
                                            fontSize: '32px'
                                        }}></i>
                                        <div className="nes-balloon from-left is-dark" style={{
                                            background: '#2d1b3d',
                                            border: '4px solid #ffc010',
                                            color: '#ffd966',
                                            maxWidth: '400px'
                                        }}>
                                            <p style={{ 
                                                fontFamily: 'Minecraft, monospace',
                                                fontSize: '13px',
                                                margin: 0
                                            }}>
                                                🏆 Massive prizes + exclusive retro arcade merch! INSERT COIN to begin your journey.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="about-content3 mt-30">
                                <div className="row">
                                    <div className="col-md-12">
                                        <ul className="green">
                                            <li>{'15+ Technical and Creative Events'}</li>
                                            <li>{'Robotics, Coding and Gaming Competitions'}</li>
                                            <li>{'Prizes Worth [AMOUNT]+'}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="slider-btn2 mt-30">
                                <Button8bit to={'/about'} variant="primary" size="medium">{'Discover More'}</Button8bit>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default About;