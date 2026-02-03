import React from 'react';
import CoreMemberCard from './CoreMemberCard';
import EventTeamSection from '../../Pages/Team/EventTeamSection';
import { coreMembers, eventTeams } from '../../Pages/Team/teamData';
import AnimateOnScroll from '../ScrollAnimation/AnimateOnScroll';

const TeamTwo = () => {
  return (
    <section id="team" className="team-area2 team-page-retro" style={{ paddingTop: '10px', paddingBottom: '60px' }}>
      <div className="container">
        {/* Meet Our Team - Core members as circular pixel cards */}
        <div className="row">
          <div className="col-12">
            <AnimateOnScroll animation="fade-scale">
              <h2 className="team-retro-title">Meet Our Team</h2>
              <p className="team-retro-subtitle">Organizing Committee</p>
            </AnimateOnScroll>
            <div className="core-members-wrap">
              {coreMembers.map((member, index) => (
                <AnimateOnScroll key={member.id} animation="fade-scale" delay={index * 80}>
                  <CoreMemberCard
                    avatar={member.avatar}
                    name={member.name}
                    deg={member.deg}
                  />
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </div>

        {/* Event-wise coordinators & volunteers */}
        <div className="row">
          <div className="col-12">
            <AnimateOnScroll animation="fade-scale">
              <h2 className="team-retro-title">Event Co-ordinators &amp; Volunteers</h2>
              <p className="team-retro-subtitle">Student Co-ordinators and Volunteers for each event</p>
            </AnimateOnScroll>
            <div className="event-teams-section">
              {eventTeams.map((event) => (
                <EventTeamSection
                  key={event.id}
                  eventName={event.eventName}
                  coordinators={event.coordinators}
                  volunteers={event.volunteers}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamTwo;
