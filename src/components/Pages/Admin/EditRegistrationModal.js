import React, { useState } from 'react';
import './Modal.css';

const EditRegistrationModal = ({ registration, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    // Basic info
    fullName: registration.fullName || '',
    emailAddress: registration.emailAddress || registration.email || '',
    contactNumber: registration.contactNumber || registration.phone || '',
    collegeName: registration.collegeName || registration.college || '',
    year: registration.year || registration.yearOfStudy || '',
    department: registration.department || '',
    streamBranch: registration.streamBranch || '',
    
    // Team info
    teamName: registration.teamName || '',
    teamSize: registration.teamSize || registration.numberOfParticipants || '1',
    
    // Team members
    teamMember2Name: registration.teamMember2Name || '',
    teamMember2Email: registration.teamMember2Email || '',
    teamMember2Phone: registration.teamMember2Phone || '',
    teamMember3Name: registration.teamMember3Name || '',
    teamMember3Email: registration.teamMember3Email || '',
    teamMember3Phone: registration.teamMember3Phone || '',
    teamMember4Name: registration.teamMember4Name || '',
    teamMember4Email: registration.teamMember4Email || '',
    teamMember4Phone: registration.teamMember4Phone || '',
    
    // Participants array
    participants: registration.participants || [],
    
    // Game-specific fields
    fifaUsername: registration.fifaUsername || '',
    teamOvr: registration.teamOvr || '',
    deviceModel: registration.deviceModel || '',
    gameUsername: registration.gameUsername || '',
    playerRating: registration.playerRating || '',
    gamingPlatform: registration.gamingPlatform || '',
    
    // Payment
    paymentMode: registration.paymentMode || registration.paymentMethod || 'online',
    transactionId: registration.transactionId || '',
    paymentStatus: registration.paymentStatus || 'pending',
    registrationStatus: registration.registrationStatus || 'pending',
  });

  const [activeTab, setActiveTab] = useState('basic');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleParticipantChange = (index, field, value) => {
    const updatedParticipants = [...formData.participants];
    if (!updatedParticipants[index]) {
      updatedParticipants[index] = {};
    }
    updatedParticipants[index][field] = value;
    setFormData(prev => ({ ...prev, participants: updatedParticipants }));
  };

  const addParticipant = () => {
    setFormData(prev => ({
      ...prev,
      participants: [...prev.participants, { name: '', email: '', contact: '', college: '', year: '', department: '' }]
    }));
  };

  const removeParticipant = (index) => {
    setFormData(prev => ({
      ...prev,
      participants: prev.participants.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Clean up data - remove empty fields
    const cleanedData = Object.entries(formData).reduce((acc, [key, value]) => {
      if (value !== '' && value !== null && value !== undefined) {
        acc[key] = value;
      }
      return acc;
    }, {});
    
    onSave(registration._id, cleanedData);
    onClose();
  };

  const teamSize = parseInt(formData.teamSize) || 1;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content large-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2>Edit Registration</h2>
            <p className="modal-subtitle">{registration.registrationNumber}</p>
          </div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        {/* Tabs */}
        <div className="modal-tabs">
          <button 
            className={`tab-btn ${activeTab === 'basic' ? 'active' : ''}`}
            onClick={() => setActiveTab('basic')}
          >
            Basic Info
          </button>
          <button 
            className={`tab-btn ${activeTab === 'team' ? 'active' : ''}`}
            onClick={() => setActiveTab('team')}
          >
            Team Members
          </button>
          <button 
            className={`tab-btn ${activeTab === 'payment' ? 'active' : ''}`}
            onClick={() => setActiveTab('payment')}
          >
            Payment & Status
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {/* Basic Info Tab */}
            {activeTab === 'basic' && (
              <>
                <div className="form-section">
                  <h3>Participant Information</h3>
                  <div className="form-grid">
                    <div className="form-field">
                      <label>Full Name *</label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-field">
                      <label>Email Address *</label>
                      <input
                        type="email"
                        name="emailAddress"
                        value={formData.emailAddress}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-field">
                      <label>Contact Number *</label>
                      <input
                        type="tel"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-field">
                      <label>College Name *</label>
                      <input
                        type="text"
                        name="collegeName"
                        value={formData.collegeName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-field">
                      <label>Year of Study</label>
                      <input
                        type="text"
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-field">
                      <label>Department</label>
                      <input
                        type="text"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-field">
                      <label>Stream/Branch</label>
                      <input
                        type="text"
                        name="streamBranch"
                        value={formData.streamBranch}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h3>Team Information</h3>
                  <div className="form-grid">
                    <div className="form-field">
                      <label>Team Name</label>
                      <input
                        type="text"
                        name="teamName"
                        value={formData.teamName}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-field">
                      <label>Team Size</label>
                      <input
                        type="number"
                        name="teamSize"
                        value={formData.teamSize}
                        onChange={handleChange}
                        min="1"
                        max="10"
                      />
                    </div>
                  </div>
                </div>

                {/* Game-specific fields */}
                {(registration.fifaUsername || registration.gameUsername) && (
                  <div className="form-section">
                    <h3>Game Details</h3>
                    <div className="form-grid">
                      <div className="form-field">
                        <label>FIFA Username</label>
                        <input
                          type="text"
                          name="fifaUsername"
                          value={formData.fifaUsername}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-field">
                        <label>Team OVR</label>
                        <input
                          type="text"
                          name="teamOvr"
                          value={formData.teamOvr}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-field">
                        <label>Device Model</label>
                        <input
                          type="text"
                          name="deviceModel"
                          value={formData.deviceModel}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-field">
                        <label>Game Username</label>
                        <input
                          type="text"
                          name="gameUsername"
                          value={formData.gameUsername}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-field">
                        <label>Player Rating</label>
                        <input
                          type="text"
                          name="playerRating"
                          value={formData.playerRating}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-field">
                        <label>Gaming Platform</label>
                        <input
                          type="text"
                          name="gamingPlatform"
                          value={formData.gamingPlatform}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Team Members Tab */}
            {activeTab === 'team' && (
              <>
                {/* Individual Team Member Fields */}
                {teamSize >= 2 && (
                  <div className="form-section">
                    <h3>Team Member 2</h3>
                    <div className="form-grid">
                      <div className="form-field">
                        <label>Name</label>
                        <input
                          type="text"
                          name="teamMember2Name"
                          value={formData.teamMember2Name}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-field">
                        <label>Email</label>
                        <input
                          type="email"
                          name="teamMember2Email"
                          value={formData.teamMember2Email}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-field">
                        <label>Phone</label>
                        <input
                          type="tel"
                          name="teamMember2Phone"
                          value={formData.teamMember2Phone}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {teamSize >= 3 && (
                  <div className="form-section">
                    <h3>Team Member 3</h3>
                    <div className="form-grid">
                      <div className="form-field">
                        <label>Name</label>
                        <input
                          type="text"
                          name="teamMember3Name"
                          value={formData.teamMember3Name}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-field">
                        <label>Email</label>
                        <input
                          type="email"
                          name="teamMember3Email"
                          value={formData.teamMember3Email}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-field">
                        <label>Phone</label>
                        <input
                          type="tel"
                          name="teamMember3Phone"
                          value={formData.teamMember3Phone}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {teamSize >= 4 && (
                  <div className="form-section">
                    <h3>Team Member 4</h3>
                    <div className="form-grid">
                      <div className="form-field">
                        <label>Name</label>
                        <input
                          type="text"
                          name="teamMember4Name"
                          value={formData.teamMember4Name}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-field">
                        <label>Email</label>
                        <input
                          type="email"
                          name="teamMember4Email"
                          value={formData.teamMember4Email}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-field">
                        <label>Phone</label>
                        <input
                          type="tel"
                          name="teamMember4Phone"
                          value={formData.teamMember4Phone}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Participants Array */}
                {formData.participants.length > 0 && (
                  <div className="form-section">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <h3>Participants ({formData.participants.length})</h3>
                      <button type="button" className="btn-primary" onClick={addParticipant}>
                        + Add Participant
                      </button>
                    </div>
                    {formData.participants.map((participant, index) => (
                      <div key={index} className="team-member-card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                          <h4>Participant {index + 1}</h4>
                          <button 
                            type="button" 
                            className="btn-secondary" 
                            onClick={() => removeParticipant(index)}
                            style={{ padding: '4px 12px', fontSize: '12px' }}
                          >
                            Remove
                          </button>
                        </div>
                        <div className="form-grid">
                          <div className="form-field">
                            <label>Name</label>
                            <input
                              type="text"
                              value={participant.name || ''}
                              onChange={(e) => handleParticipantChange(index, 'name', e.target.value)}
                            />
                          </div>
                          <div className="form-field">
                            <label>Email</label>
                            <input
                              type="email"
                              value={participant.email || ''}
                              onChange={(e) => handleParticipantChange(index, 'email', e.target.value)}
                            />
                          </div>
                          <div className="form-field">
                            <label>Contact</label>
                            <input
                              type="tel"
                              value={participant.contact || ''}
                              onChange={(e) => handleParticipantChange(index, 'contact', e.target.value)}
                            />
                          </div>
                          <div className="form-field">
                            <label>College</label>
                            <input
                              type="text"
                              value={participant.college || ''}
                              onChange={(e) => handleParticipantChange(index, 'college', e.target.value)}
                            />
                          </div>
                          <div className="form-field">
                            <label>Year</label>
                            <input
                              type="text"
                              value={participant.year || ''}
                              onChange={(e) => handleParticipantChange(index, 'year', e.target.value)}
                            />
                          </div>
                          <div className="form-field">
                            <label>Department</label>
                            <input
                              type="text"
                              value={participant.department || ''}
                              onChange={(e) => handleParticipantChange(index, 'department', e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {teamSize === 1 && formData.participants.length === 0 && (
                  <div className="empty-state">
                    <p>This is a solo registration (Team Size: 1)</p>
                    <p>No additional team members to edit</p>
                  </div>
                )}
              </>
            )}

            {/* Payment & Status Tab */}
            {activeTab === 'payment' && (
              <>
                <div className="form-section">
                  <h3>Payment Information</h3>
                  <div className="form-grid">
                    <div className="form-field">
                      <label>Payment Mode</label>
                      <select
                        name="paymentMode"
                        value={formData.paymentMode}
                        onChange={handleChange}
                      >
                        <option value="online">Online</option>
                        <option value="offline">Offline</option>
                      </select>
                    </div>
                    <div className="form-field">
                      <label>Transaction ID</label>
                      <input
                        type="text"
                        name="transactionId"
                        value={formData.transactionId}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-field">
                      <label>Payment Status *</label>
                      <select
                        name="paymentStatus"
                        value={formData.paymentStatus}
                        onChange={handleChange}
                        required
                      >
                        <option value="pending">Pending</option>
                        <option value="verified">Verified</option>
                        <option value="failed">Failed</option>
                        <option value="not-required">Not Required</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h3>Registration Status</h3>
                  <div className="form-grid">
                    <div className="form-field">
                      <label>Registration Status *</label>
                      <select
                        name="registrationStatus"
                        value={formData.registrationStatus}
                        onChange={handleChange}
                        required
                      >
                        <option value="confirmed">Confirmed</option>
                        <option value="pending">Pending</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="waitlist">Waitlist</option>
                        <option value="rejected">Rejected</option>
                        <option value="checked-in">Checked In</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="info-box">
                  <p>📝 Registration Number: <strong>{registration.registrationNumber}</strong></p>
                  <p>🎯 Event: <strong>{registration.eventName}</strong></p>
                  <p>📅 Submitted: <strong>{new Date(registration.submittedAt).toLocaleString('en-IN')}</strong></p>
                </div>
              </>
            )}
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditRegistrationModal;
