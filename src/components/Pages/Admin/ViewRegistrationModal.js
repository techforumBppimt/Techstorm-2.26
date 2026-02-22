import React, { useState } from 'react';
import './Modal.css';

/** Get email from registration object, checking all known and email-like keys. Display only. */
function getEmailFromRegistration(reg) {
  if (!reg || typeof reg !== 'object') return '';
  const tryKeys = (obj) => {
    for (const k of ['emailAddress', 'email', 'teamLeaderEmail', 'teamMember2Email']) {
      const v = obj[k];
      if (v != null && String(v).trim() !== '') return String(v).trim();
    }
    for (const key of Object.keys(obj)) {
      if (key.toLowerCase().includes('email') && typeof obj[key] === 'string' && obj[key].trim() !== '')
        return obj[key].trim();
    }
    return '';
  };
  const main = tryKeys(reg);
  if (main) return main;
  const first = reg.participants && reg.participants[0];
  if (first && typeof first === 'object') return tryKeys(first);
  return '';
}

const ViewRegistrationModal = ({ registration, onClose }) => {
  const [activeTab, setActiveTab] = useState('basic');

  if (!registration) return null;

  // Helper function to format field names
  const formatFieldName = (key) => {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase())
      .trim();
  };

  // Helper function to check if value exists and is not empty
  const hasValue = (value) => {
    if (value === null || value === undefined || value === '') return false;
    if (Array.isArray(value) && value.length === 0) return false;
    if (typeof value === 'object' && Object.keys(value).length === 0) return false;
    return true;
  };

  // Helper to render file links
  const renderFileLink = (url, cloudinaryId, label) => {
    if (!url && !cloudinaryId) return null;
    return (
      <div className="file-link">
        <span>📎 {label}</span>
        {url && (
          <a href={url} target="_blank" rel="noopener noreferrer" className="view-file-btn">
            View File
          </a>
        )}
      </div>
    );
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content large-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2>Registration Details</h2>
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
            Team/Participants
          </button>
          <button 
            className={`tab-btn ${activeTab === 'payment' ? 'active' : ''}`}
            onClick={() => setActiveTab('payment')}
          >
            Payment
          </button>
          <button 
            className={`tab-btn ${activeTab === 'files' ? 'active' : ''}`}
            onClick={() => setActiveTab('files')}
          >
            Files
          </button>
          <button 
            className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All Fields
          </button>
        </div>

        <div className="modal-body">
          {/* Basic Information Tab */}
          {activeTab === 'basic' && (
            <>
              <div className="detail-section">
                <h3>Participant Information</h3>
                <div className="detail-grid">
                  <DetailField label="Registration Number" value={registration.registrationNumber} highlight />
                  <DetailField label="Full Name" value={registration.fullName} />
                  <DetailField label="Email" value={getEmailFromRegistration(registration)} />
                  <DetailField label="Contact Number" value={registration.contactNumber || registration.phone} />
                  <DetailField label="College Name" value={registration.collegeName || registration.college} />
                  <DetailField label="Year of Study" value={registration.year || registration.yearOfStudy} />
                  <DetailField label="Department" value={registration.department} />
                  <DetailField label="Stream/Branch" value={registration.streamBranch} />
                  <DetailField label="Student ID" value={registration.studentId} />
                </div>
              </div>

              <div className="detail-section">
                <h3>Event Details</h3>
                <div className="detail-grid">
                  <DetailField label="Event Name" value={registration.eventName} highlight />
                  <DetailField label="Team Name" value={registration.teamName} />
                  <DetailField label="Team Size" value={registration.teamSize} />
                  <DetailField label="Number of Participants" value={registration.numberOfParticipants} />
                  
                  {/* Game-specific fields */}
                  <DetailField label="FIFA Username" value={registration.fifaUsername} />
                  <DetailField label="Team OVR" value={registration.teamOvr} />
                  <DetailField label="Device Model" value={registration.deviceModel} />
                  <DetailField label="Game Username" value={registration.gameUsername} />
                  <DetailField label="Player Rating" value={registration.playerRating} />
                  <DetailField label="Gaming Platform" value={registration.gamingPlatform} />
                  
                  {/* Other fields */}
                  <DetailField label="Experience Level" value={registration.experienceLevel} />
                  <DetailField label="Dietary Restrictions" value={registration.dietaryRestrictions} />
                  <DetailField label="Special Requirements" value={registration.specialRequirements} />
                  <DetailField label="How Did You Hear" value={registration.howDidYouHear} />
                </div>
              </div>

              <div className="detail-section">
                <h3>Registration Status</h3>
                <div className="detail-grid">
                  <div className="detail-field">
                    <label>Status</label>
                    <p className={`status-pill reg-${registration.registrationStatus}`}>
                      {registration.registrationStatus}
                    </p>
                  </div>
                  <DetailField label="Submitted At" value={registration.submittedAt ? new Date(registration.submittedAt).toLocaleString('en-IN') : null} />
                  <DetailField label="Updated At" value={registration.updatedAt ? new Date(registration.updatedAt).toLocaleString('en-IN') : null} />
                  <DetailField label="Source" value={registration.source || 'web'} />
                </div>
              </div>

              {/* Confirmations */}
              {(registration.whatsappConfirmed || registration.agreeToTerms || registration.agreeToRules) && (
                <div className="detail-section">
                  <h3>Confirmations</h3>
                  <div className="detail-grid">
                    <DetailField label="WhatsApp Confirmed" value={registration.whatsappConfirmed ? '✅ Yes' : '❌ No'} />
                    <DetailField label="Agree to Terms" value={registration.agreeToTerms ? '✅ Yes' : '❌ No'} />
                    <DetailField label="Agree to Rules" value={registration.agreeToRules ? '✅ Yes' : '❌ No'} />
                  </div>
                </div>
              )}
            </>
          )}

          {/* Team/Participants Tab */}
          {activeTab === 'team' && (
            <>
              {/* Team Members (individual fields) */}
              {(registration.teamMember2Name || registration.teamMember3Name || registration.teamMember4Name) && (
                <div className="detail-section">
                  <h3>Team Members</h3>
                  
                  {registration.teamMember2Name && (
                    <div className="team-member-card">
                      <h4>Team Member 2</h4>
                      <div className="detail-grid">
                        <DetailField label="Name" value={registration.teamMember2Name} />
                        <DetailField label="Email" value={registration.teamMember2Email} />
                        <DetailField label="Phone" value={registration.teamMember2Phone} />
                      </div>
                    </div>
                  )}
                  
                  {registration.teamMember3Name && (
                    <div className="team-member-card">
                      <h4>Team Member 3</h4>
                      <div className="detail-grid">
                        <DetailField label="Name" value={registration.teamMember3Name} />
                        <DetailField label="Email" value={registration.teamMember3Email} />
                        <DetailField label="Phone" value={registration.teamMember3Phone} />
                      </div>
                    </div>
                  )}
                  
                  {registration.teamMember4Name && (
                    <div className="team-member-card">
                      <h4>Team Member 4</h4>
                      <div className="detail-grid">
                        <DetailField label="Name" value={registration.teamMember4Name} />
                        <DetailField label="Email" value={registration.teamMember4Email} />
                        <DetailField label="Phone" value={registration.teamMember4Phone} />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Participants Array */}
              {registration.participants && registration.participants.length > 0 && (
                <div className="detail-section">
                  <h3>Participants ({registration.participants.length})</h3>
                  {console.log('👥 Total participants:', registration.participants.length)}
                  {console.log('👥 Participants data:', registration.participants)}
                  {registration.participants.map((participant, index) => (
                    <div key={index} className="team-member-card">
                      <h4>Participant {index + 1}</h4>
                      <div className="detail-grid">
                        <DetailField label="Name" value={participant.name} />
                        <DetailField label="Email" value={participant.email} />
                        <DetailField label="Contact" value={participant.contact} />
                        <DetailField label="College" value={participant.college} />
                        <DetailField label="Year" value={participant.year} />
                        <DetailField label="Department" value={participant.department} />
                        <DetailField label="Role" value={participant.role} />
                        {participant.idFileUrl && renderFileLink(participant.idFileUrl, participant.idFileCloudinaryId, 'ID Proof')}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {!registration.teamMember2Name && !registration.participants?.length && (
                <div className="empty-state">
                  <p>No team members or participants data available</p>
                </div>
              )}
            </>
          )}

          {/* Payment Tab */}
          {activeTab === 'payment' && (
            <>
              <div className="detail-section">
                <h3>Payment Information</h3>
                <div className="detail-grid">
                  <div className="detail-field">
                    <label>Payment Status</label>
                    <p className={`status-pill payment-${registration.paymentStatus}`}>
                      {registration.paymentStatus}
                    </p>
                  </div>
                  <DetailField label="Payment Mode" value={registration.paymentMode || registration.paymentMethod} />
                  <DetailField label="Transaction ID" value={registration.transactionId} />
                  <DetailField label="Payment Date" value={registration.paymentDate} />
                </div>
              </div>

              {/* Payment Files */}
              <div className="detail-section">
                <h3>Payment Documents</h3>
                <div className="file-list">
                  {renderFileLink(registration.paymentReceiptUrl, registration.paymentReceiptCloudinaryId, 'Payment Receipt')}
                  {renderFileLink(registration.paymentScreenshotUrl, registration.paymentScreenshotCloudinaryId, 'Payment Screenshot')}
                  {renderFileLink(registration.cashReceiptUrl, registration.cashReceiptCloudinaryId, 'Cash Receipt')}
                  
                  {!registration.paymentReceiptUrl && !registration.paymentScreenshotUrl && !registration.cashReceiptUrl && (
                    <p className="empty-state">No payment documents uploaded</p>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Files Tab */}
          {activeTab === 'files' && (
            <div className="detail-section">
              <h3>All Uploaded Files</h3>
              <div className="file-list">
                {/* Main ID Proofs */}
                {renderFileLink(registration.idProofUrl, registration.idProofCloudinaryId, 'ID Proof (Main)')}
                {renderFileLink(registration.idFileUrl, registration.idFileCloudinaryId, 'ID File (Main)')}
                {renderFileLink(registration.collegeIdProofUrl, registration.collegeIdProofCloudinaryId, 'College ID Proof')}
                {renderFileLink(registration.participantIdProofUrl, registration.participantIdProofCloudinaryId, 'Participant ID Proof')}
                
                {/* Participant ID Proofs from participants array */}
                {registration.participants && registration.participants.length > 0 && (
                  <>
                    <h4 style={{ marginTop: '20px', marginBottom: '10px', color: '#666' }}>Participant ID Proofs</h4>
                    {registration.participants.map((participant, index) => (
                      participant.idFileUrl && (
                        <div key={index} className="file-link">
                          <span>📎 Participant {index + 1} - {participant.name || 'N/A'} ID Proof</span>
                          <a href={participant.idFileUrl} target="_blank" rel="noopener noreferrer" className="view-file-btn">
                            View File
                          </a>
                        </div>
                      )
                    ))}
                  </>
                )}
                
                {/* Payment Documents */}
                <h4 style={{ marginTop: '20px', marginBottom: '10px', color: '#666' }}>Payment Documents</h4>
                {renderFileLink(registration.paymentReceiptUrl, registration.paymentReceiptCloudinaryId, 'Payment Receipt')}
                {renderFileLink(registration.paymentScreenshotUrl, registration.paymentScreenshotCloudinaryId, 'Payment Screenshot')}
                {renderFileLink(registration.cashReceiptUrl, registration.cashReceiptCloudinaryId, 'Cash Receipt')}
                
                {/* Transaction ID if available */}
                {registration.transactionId && (
                  <div className="file-link" style={{ marginTop: '15px', padding: '10px', background: '#f5f5f5', borderRadius: '4px' }}>
                    <span style={{ fontWeight: 'bold' }}>💳 Transaction ID:</span>
                    <span style={{ marginLeft: '10px', fontFamily: 'monospace' }}>{registration.transactionId}</span>
                  </div>
                )}
                
                {!registration.idProofUrl && !registration.idFileUrl && !registration.paymentReceiptUrl && 
                 !registration.paymentScreenshotUrl && !registration.cashReceiptUrl && 
                 !registration.collegeIdProofUrl && !registration.participantIdProofUrl &&
                 (!registration.participants || !registration.participants.some(p => p.idFileUrl)) && (
                  <p className="empty-state">No files uploaded</p>
                )}
              </div>
            </div>
          )}

          {/* All Fields Tab - Raw Data */}
          {activeTab === 'all' && (
            <div className="detail-section">
              <h3>All Database Fields</h3>
              <div className="raw-data">
                {Object.entries(registration)
                  .filter(([key]) => !key.startsWith('_') && key !== '__v')
                  .sort(([a], [b]) => a.localeCompare(b))
                  .map(([key, value]) => {
                    if (!hasValue(value)) return null;
                    
                    return (
                      <div key={key} className="raw-field">
                        <label>{formatFieldName(key)}</label>
                        <div className="raw-value">
                          {typeof value === 'object' ? (
                            <pre>{JSON.stringify(value, null, 2)}</pre>
                          ) : typeof value === 'boolean' ? (
                            value ? '✅ Yes' : '❌ No'
                          ) : (
                            <span>{String(value)}</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

// Helper component for consistent field display
const DetailField = ({ label, value, highlight }) => {
  if (!value && value !== 0 && value !== false) return null;
  
  return (
    <div className={`detail-field ${highlight ? 'highlight' : ''}`}>
      <label>{label}</label>
      <p>{String(value)}</p>
    </div>
  );
};

export default ViewRegistrationModal;
