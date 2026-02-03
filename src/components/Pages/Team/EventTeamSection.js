import React from 'react';

const EventTeamSection = ({ eventName, coordinators, volunteers }) => {
  return (
    <div className="event-team-block">
      <h3 className="event-team-title">{eventName}</h3>
      {coordinators && coordinators.length > 0 && (
        <>
          <p className="event-team-subtitle">Student Co-Ordinator</p>
          {coordinators.map((c, i) => (
            <div key={i} className="event-coordinator-row">
              <span className="name">{c.name}</span>
              <span className="dept">({c.dept})</span>
              {c.phone && <span className="phone">{c.phone}</span>}
            </div>
          ))}
        </>
      )}
      {volunteers && volunteers.length > 0 && (
        <>
          <p className="event-team-subtitle">Volunteers</p>
          <div className="event-volunteers">
            {volunteers.map((v, i) => (
              <span key={i}>{v}</span>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default EventTeamSection;
