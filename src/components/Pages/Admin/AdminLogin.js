import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import API_URL from '../../../config/api';
import './AdminLogin.css';

const AdminLogin = () => {
  const history = useHistory();
  const location = useLocation();
  
  // Extract role from pathname (/admin/core -> core)
  const role = location.pathname.split('/')[2];
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const roleConfig = {
    core: {
      name: 'Core',
      icon: '🔴',
      color: '#ff4444',
      placeholder: 'core@techstorm.com'
    },
    coordinator: {
      name: 'Coordinator',
      icon: '🟡',
      color: '#ffaa00',
      placeholder: 'coord<event>@techstorm.com'
    },
    volunteer: {
      name: 'Volunteer',
      icon: '🟢',
      color: '#44ff44',
      placeholder: 'volt<event>@techstorm.com'
    }
  };

  const config = roleConfig[role] || roleConfig.core;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          role
        })
      });

      const data = await response.json();

      if (response.ok) {
        // Store token and user data
        localStorage.setItem('adminToken', data.token);
        localStorage.setItem('adminUser', JSON.stringify(data.user));
        
        // Redirect to dashboard
        history.push(`/admin/${role}/dashboard`);
      } else {
        setError(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      setError('Connection error. Please ensure the backend server is running.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    history.push('/admin');
  };

  return (
    <div className="admin-login" style={{ '--role-color': config.color }}>
      <div className="login-container">
        <button className="back-button" onClick={handleBack}>
          ← Back to Role Selection
        </button>

        <div className="login-card">
          <div className="login-header">
            <div className="role-icon-large">{config.icon}</div>
            <h1 className="login-title">{config.name} Login</h1>
            <p className="login-subtitle">Enter your credentials to access the {config.name} portal</p>
          </div>

          {error && (
            <div className="error-message">
              <span className="error-icon">⚠️</span>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={config.placeholder}
                required
                disabled={loading}
                className="form-input"
              />
              <span className="input-hint">
                {role === 'core' 
                  ? 'Use: core@techstorm.com' 
                  : `Format: ${config.placeholder}`
                }
              </span>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                disabled={loading}
                className="form-input"
              />
              <span className="input-hint">
                {role === 'core' 
                  ? 'Password: sapbad@2026' 
                  : role === 'coordinator'
                  ? 'Format: coord<event>'
                  : 'Format: volt<event>'
                }
              </span>
            </div>

            <button 
              type="submit" 
              className="submit-button"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Logging in...
                </>
              ) : (
                <>
                  Login to {config.name} Portal
                  <span className="arrow">→</span>
                </>
              )}
            </button>
          </form>

          <div className="login-info">
            <h3>Access Information:</h3>
            <ul>
              {role === 'core' ? (
                <>
                  <li>✓ Full system access</li>
                  <li>✓ All CRUD operations</li>
                  <li>✓ User management</li>
                </>
              ) : role === 'coordinator' ? (
                <>
                  <li>✓ Event management</li>
                  <li>✓ Read & Update access</li>
                  <li>✓ Registration viewing</li>
                </>
              ) : (
                <>
                  <li>✓ View event details</li>
                  <li>✓ Read-only access</li>
                  <li>✓ Participant information</li>
                </>
              )}
            </ul>
          </div>
        </div>

        <div className="security-notice">
          <span className="lock-icon">🔒</span>
          <p>This is a secure admin portal. Unauthorized access is prohibited.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
