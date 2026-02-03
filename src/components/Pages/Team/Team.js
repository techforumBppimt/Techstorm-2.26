import React from 'react';
import { Link } from 'react-router-dom';
import heroVideo from '../../../assets/img/HERO.mp4';
import aboutBg from '../../../assets/img/aboutbg.png';
import SectionTitle from '../../Utilities/SectionTitle/SectionTitle';
import Member from '../../Utilities/Team/Member';
import { coreMembers } from './teamData';
import TeamEventCards from './TeamEventCards';
import './Team.css';

const Teams = () => {
  return (
    <React.Fragment>
      {/* Video background only for Organizing Committee section */}
      <div className="team-org-hero">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="team-hero-video"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="team-hero-overlay">
          <section className="breadcrumb-area d-flex align-items-center team-breadcrumb">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-xl-12 col-lg-12">
                  <div className="breadcrumb-wrap text-left">
                    <div className="breadcrumb-title">
                      <h2>Team</h2>
                      <div className="breadcrumb-wrap">
                        <nav aria-label="breadcrumb">
                          <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                              <Link to="/">Home</Link>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">Team</li>
                          </ol>
                        </nav>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section id="team" className="team-area2 team-org-section pb-120">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 p-relative">
                  <SectionTitle titlefirst="Organizing" titleSec="Committee" />
                </div>
              </div>
              <div className="row team-org-members-row">
                <Member teamData={coreMembers} />
              </div>
            </div>
          </section>
        </div>
        <div className="team-hero-bottom-accent" aria-hidden="true" />
      </div>

      {/* Co-ordinators & Volunteers: preserve layout — EVENT TEAMS badge, aboutbg, headings, yellow underline */}
      <section
        className="team-events-section"
        style={{
          backgroundImage: `url(${aboutBg})`,
          backgroundRepeat: 'repeat',
          backgroundPosition: 'center',
        }}
      >
        <div className="container">
          <div className="team-events-heading">
            <span className="team-events-badge">Event Teams</span>
            <h2 className="team-events-title">Co-ordinators &amp; Volunteers</h2>
            <p className="team-events-subtitle">Student Co-ordinators and Volunteers for each event</p>
            <div className="team-events-title-underline" />
          </div>
          <TeamEventCards />
        </div>
      </section>
    </React.Fragment>
  );
};

export default Teams;
