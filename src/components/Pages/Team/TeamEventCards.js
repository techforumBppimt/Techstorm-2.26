import React, { useState } from 'react';
import RetroCard from '../../Utilities/RetroCard/RetroCard';
import { eventTeams } from './teamData';
import EventTeamContent from './EventTeamContent';

const TeamEventCards = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="team-event-cards">
      <div className="row">
        {eventTeams.map((event, index) => (
          <div
            key={event.id}
            className="col-lg-4 col-md-6 col-sm-6 team-event-card-col"
          >
            <RetroCard
              bg={hoveredIndex === index ? '#1a3d3d' : '#14142A'}
              textColor={hoveredIndex === index ? '#00ffea' : '#FFF4C7'}
              borderColor={hoveredIndex === index ? '#00ffea' : '#ffc010'}
              shadowColor={hoveredIndex === index ? '#00ffea' : '#280F0E'}
              className="team-event-card"
              style={{
                transform: hoveredIndex === index ? 'translateY(-8px)' : 'translateY(0)',
                transition: 'transform 0.2s ease, background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease',
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <h3
                className="team-event-card-title"
                style={{
                  color: hoveredIndex === index ? '#00ffea' : undefined,
                  textShadow: hoveredIndex === index ? '0 0 12px rgba(0, 255, 234, 0.6)' : undefined,
                }}
              >
                {event.eventName}
              </h3>
              <EventTeamContent
                coordinators={event.coordinators}
                volunteers={event.volunteers}
              />
            </RetroCard>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamEventCards;
