import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './RegistrationSuccess.css';

const RegistrationSuccess = ({ registrationNumber, eventName, onClose }) => {
  const history = useHistory();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(registrationNumber).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(err => {
      console.error('Failed to copy:', err);
    });
  };

  const handleGoHome = () => {
    if (onClose) onClose();
    history.push('/');
  };

  const handleVerifyStatus = () => {
    if (onClose) onClose();
    history.push(`/verify-registration?regNo=${registrationNumber}`);
  };

  return (
    <div className="registration-success-overlay">
      <div className="registration-success-container">
        <div className="success-icon-wrapper">
          <div className="success-icon">✓</div>
        </div>

        <h2 className="success-title">Registration Successful!</h2>
        <p className="success-subtitle">Your registration for {eventName} has been confirmed</p>

        <div className="registration-number-section">
          <label className="reg-number-label">Your Registration Number</label>
          <div className="reg-number-display">
            <span className="reg-number-text">{registrationNumber}</span>
            <button 
              className="copy-button" 
              onClick={handleCopy}
              title="Copy to clipboard"
            >
              {copied ? '✓ Copied' : '📋 Copy'}
            </button>
          </div>
        </div>

        <div className="important-note">
          <div className="note-header">
            <span className="note-icon">⚠️</span>
            <span className="note-title">Important Note</span>
          </div>
          <p className="note-content">
            Please save this registration number or take a screenshot for future reference. 
            You will need this number to verify your registration status.
          </p>
        </div>

        <div className="success-actions">
          <button className="action-button primary" onClick={handleGoHome}>
            Go to Home
          </button>
          <button className="action-button secondary" onClick={handleVerifyStatus}>
            Verify Status
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegistrationSuccess;
