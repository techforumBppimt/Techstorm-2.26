import React from 'react';

const CoreMemberCard = ({ avatar, name, deg }) => {
  return (
    <div className="core-member-card">
      <div className="pixel-circle-wrap">
        <img src={avatar} alt={name} className="pixel-avatar" />
      </div>
      <h4 className="pixel-name">{name}</h4>
      <span className="pixel-role">{deg}</span>
    </div>
  );
};

export default CoreMemberCard;
