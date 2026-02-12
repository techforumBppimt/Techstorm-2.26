import React from 'react';

const EventTeamContent = ({ coordinators, volunteers, facultyCoordinators, isHovered, categoryColor }) => {
  return (
    <div className="event-team-content">
      {coordinators && coordinators.length > 0 && (
        <div className="event-team-section">
          <div className="event-team-label-wrapper">
            <span className="event-team-icon">▸</span>
            <p 
              className="event-team-label"
              style={{ color: isHovered ? categoryColor : undefined }}
            >
              Student Co-Ordinators
            </p>
          </div>
          <div className="event-team-members">
            {coordinators.map((c, i) => (
              <div key={i} className="event-coordinator-row">
                <span className="member-bullet">•</span>
                <span className="name">{c.name}</span>
                {c.dept && <span className="dept">({c.dept})</span>}
                {c.phone && <span className="phone">• {c.phone}</span>}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {volunteers && volunteers.length > 0 && (
        <div className="event-team-section">
          <div className="event-team-label-wrapper">
            <span className="event-team-icon">▸</span>
            <p 
              className="event-team-label"
              style={{ color: isHovered ? categoryColor : undefined }}
            >
              Student Volunteers
            </p>
          </div>
          <div className="event-team-members event-volunteers">
            {volunteers.map((v, i) => (
              <div key={i} className="event-coordinator-row">
                <span className="member-bullet">•</span>
                <span className="name">{typeof v === 'string' ? v : v.name}</span>
                {typeof v === 'object' && v.dept && <span className="dept">({v.dept})</span>}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {facultyCoordinators && facultyCoordinators.length > 0 && (
        <div className="event-team-section">
          <div className="event-team-label-wrapper">
            <span className="event-team-icon">▸</span>
            <p 
              className="event-team-label"
              style={{ color: isHovered ? categoryColor : undefined }}
            >
              Faculty Coordinators
            </p>
          </div>
          <div className="event-team-members event-faculty">
            {facultyCoordinators.map((f, i) => (
              <div key={i} className="event-coordinator-row">
                <span className="member-bullet">•</span>
                <span className="name">{f}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventTeamContent;
