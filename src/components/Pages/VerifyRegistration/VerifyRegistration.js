import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import './VerifyRegistration.css';

const VerifyRegistration = () => {
  const history = useHistory();
  const location = useLocation();
  
  // Get registration number from URL query params if available
  const queryParams = new URLSearchParams(location.search);
  const initialRegNo = queryParams.get('regNo') || '';
  
  const [registrationNumber, setRegistrationNumber] = useState(initialRegNo);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!registrationNumber.trim()) {
      setError('Please enter a registration number');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL || 'http://localhost:5000/api'}/event-registration/verify/${registrationNumber.trim()}`
      );

      const data = await response.json();

      if (response.ok && data.success) {
        setResult(data.data);
      } else {
        setError(data.message || 'Registration not found');
      }
    } catch (err) {
      console.error('Verification error:', err);
      setError('Failed to verify registration. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'confirmed':
        return '#4caf50';
      case 'pending':
        return '#ff9800';
      case 'cancelled':
        return '#f44336';
      default:
        return '#999';
    }
  };

  return (
    <div className="verify-registration-page">
      <div className="verify-container">
        <div className="verify-header">
          <h1 className="verify-title">Verify Registration</h1>
          <p className="verify-subtitle">Enter your registration number to check your registration status</p>
        </div>

        <form onSubmit={handleSearch} className="verify-form">
          <div className="form-group">
            <label className="form-label">Registration Number</label>
            <input
              type="text"
              value={registrationNumber}
              onChange={(e) => setRegistrationNumber(e.target.value.toUpperCase())}
              placeholder="e.g., TEC-MLW3VXWZ-MPK"
              className="verify-input"
              disabled={loading}
            />
          </div>

          <button 
            type="submit" 
            className="verify-button"
            disabled={loading}
          >
            {loading ? 'Searching...' : 'Verify Registration'}
          </button>
        </form>

        {error && (
          <div className="error-box">
            <span className="error-icon">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {result && (
          <div className="result-box">
            <div className="result-header">
              <span className="success-icon">✓</span>
              <h2>Registration Found</h2>
            </div>

            <div className="result-details">
              <div className="detail-row">
                <span className="detail-label">Registration Number:</span>
                <span className="detail-value">{result.registrationNumber}</span>
              </div>

              <div className="detail-row">
                <span className="detail-label">Event Name:</span>
                <span className="detail-value">{result.eventName}</span>
              </div>

              <div className="detail-row">
                <span className="detail-label">Participant Name:</span>
                <span className="detail-value">{result.participantName}</span>
              </div>

              <div className="detail-row">
                <span className="detail-label">Payment Status:</span>
                <span 
                  className="detail-value status-badge"
                  style={{ backgroundColor: getStatusColor(result.paymentStatus) }}
                >
                  {result.paymentStatus}
                </span>
              </div>

              <div className="detail-row">
                <span className="detail-label">Registration Status:</span>
                <span 
                  className="detail-value status-badge"
                  style={{ backgroundColor: getStatusColor(result.registrationStatus) }}
                >
                  {result.registrationStatus}
                </span>
              </div>

              {result.submittedAt && (
                <div className="detail-row">
                  <span className="detail-label">Submitted At:</span>
                  <span className="detail-value">
                    {new Date(result.submittedAt).toLocaleString()}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="verify-actions">
          <button 
            className="back-button"
            onClick={() => history.push('/')}
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyRegistration;
