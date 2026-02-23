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
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const roleConfig = {
    core: {
      name: 'Core',
      color: '#0f766e',
      placeholder: 'core@techstorm.com'
    },
    coordinator: {
      name: 'Coordinator',
      color: '#2563eb',
      placeholder: 'coord<event>@techstorm.com'
    },
    volunteer: {
      name: 'Volunteer',
      color: '#9333ea',
      placeholder: 'volt<event>@techstorm.com'
    }
  };

  const config = roleConfig[role] || roleConfig.core;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/admin-auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password
        })
      });

      const data = await response.json();

      if (response.ok) {
        // Store token and user data with role-specific keys
        localStorage.setItem(`adminToken_${role}`, data.token);
        localStorage.setItem(`adminUser_${role}`, JSON.stringify(data.user));

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
          Back to role selection
        </button>

        <div className="login-card">
          <div className="login-header">
            <span className="role-badge">{config.name.toUpperCase()}</span>
            <h1 className="login-title">{config.name} Login</h1>
            <p className="login-subtitle">Sign in to continue</p>
          </div>

          {error && <div className="error-message">{error}</div>}

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
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  disabled={loading}
                  className="form-input"
                  style={{ paddingRight: '45px' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '18px',
                    padding: '5px',
                    color: '#6b7280',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="submit-button"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
        </div>

        <div className="security-notice">
          <p>This is a secure admin portal. Unauthorized access is prohibited.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
