import React, { useState } from 'react';
import RetroCard from '../../Utilities/RetroCard/RetroCard';
import { eventTeams } from './teamData';
import EventTeamContent from './EventTeamContent';

const TeamEventCards = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const getCategoryColor = (category) => {
    switch (category) {
      case 'TECHNICAL':
        return { bg: '#2d4a4a', border: '#00d9ff', text: '#00d9ff' };
      case 'ROVER':
        return { bg: '#4a2d3e', border: '#ff4081', text: '#ff4081' };
      case 'BRAIN TEASER':
        return { bg: '#4a3e2d', border: '#ffb300', text: '#ffb300' };
      case 'CREATIVITY':
        return { bg: '#3e2d4a', border: '#b388ff', text: '#b388ff' };
      case 'GAMES':
        return { bg: '#2d4a35', border: '#69f0ae', text: '#69f0ae' };
      default:
        return { bg: '#1a3d3d', border: '#00ffea', text: '#00ffea' };
    }
  };

  return (
    <div className="team-event-cards">
      <div className="row">
        {eventTeams.map((event, index) => {
          const categoryColors = getCategoryColor(event.category);
          const isHovered = hoveredIndex === index;
          
          return (
            <div
              key={event.id}
              className="col-lg-4 col-md-6 col-sm-6 team-event-card-col"
            >
              <RetroCard
                bg={isHovered ? categoryColors.bg : '#14142A'}
                textColor={isHovered ? categoryColors.text : '#FFF4C7'}
                borderColor={isHovered ? categoryColors.border : '#ffc010'}
                shadowColor={isHovered ? categoryColors.border : '#280F0E'}
                className="team-event-card"
                style={{
                  transform: isHovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="event-card-header">
                  <div 
                    className="event-category-badge"
                    style={{
                      background: isHovered ? categoryColors.border : 'rgba(255, 192, 16, 0.15)',
                      color: isHovered ? '#14142A' : '#ffc010',
                      borderLeft: `3px solid ${isHovered ? categoryColors.border : '#ffc010'}`,
                      boxShadow: isHovered ? `0 0 15px ${categoryColors.border}40` : 'none',
                    }}
                  >
                    {event.category}
                  </div>
                  <h3
                    className="team-event-card-title"
                    style={{
                      color: isHovered ? categoryColors.text : '#ffc010',
                      textShadow: isHovered ? `0 0 12px ${categoryColors.border}99` : 'none',
                    }}
                  >
                    {event.eventName}
                  </h3>
                  <div 
                    className="event-title-divider"
                    style={{
                      background: isHovered 
                        ? `linear-gradient(90deg, transparent, ${categoryColors.border}, transparent)` 
                        : 'linear-gradient(90deg, transparent, rgba(255, 192, 16, 0.4), transparent)',
                    }}
                  />
                </div>
                <EventTeamContent
                  coordinators={event.coordinators}
                  volunteers={event.volunteers}
                  facultyCoordinators={event.facultyCoordinators}
                  isHovered={isHovered}
                  categoryColor={categoryColors.text}
                />
              </RetroCard>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TeamEventCards;
