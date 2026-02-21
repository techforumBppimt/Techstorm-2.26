import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { getDashboardStats } from '../../../utils/adminDashboardAPI';
import './RoleDashboard.css';

const StatisticsPage = () => {
  const history = useHistory();
  const location = useLocation();
  const role = location.pathname.split('/')[2];
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const result = await getDashboardStats();
      setStats(result);
      setError(null);
    } catch (err) {
      console.error('Error fetching stats:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    history.push(`/admin/${role}/dashboard`);
  };

  const roleConfig = {
    core: { name: 'Core', color: '#0f766e' },
    coordinator: { name: 'Coordinator', color: '#2563eb' },
    volunteer: { name: 'Volunteer', color: '#9333ea' }
  };

  const config = roleConfig[role] || roleConfig.core;

  if (loading) {
    return (
      <div className={`role-dashboard ${role}-dashboard`}>
        <div className="dashboard-wrapper">
          <div className="loading">Loading statistics...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`role-dashboard ${role}-dashboard`}>
        <div className="dashboard-wrapper">
          <div className="error-message">Error: {error}</div>
          <button onClick={fetchStats}>Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className={`role-dashboard ${role}-dashboard`}>
      <div className="dashboard-wrapper">
        <header className="dash-header">
          <div>
            <button className="back-btn" onClick={handleBack}>← Back</button>
            <p className="dash-kicker">TechStorm Admin</p>
            <h1 className="dash-title">Statistics</h1>
            <p className="dash-subtitle">{config.name} Dashboard</p>
          </div>
        </header>

        <div className="stats-grid">
          <div className="stat-card">
            <p className="stat-label">Total Events</p>
            <p className="stat-value">{stats?.totalEvents || 0}</p>
          </div>
          <div className="stat-card">
            <p className="stat-label">Total Registrations</p>
            <p className="stat-value">{stats?.totals?.totalRegistrations || 0}</p>
          </div>
          <div className="stat-card">
            <p className="stat-label">Confirmed</p>
            <p className="stat-value">{stats?.totals?.confirmedRegistrations || 0}</p>
          </div>
          <div className="stat-card">
            <p className="stat-label">Pending Payments</p>
            <p className="stat-value">{stats?.totals?.pendingPayments || 0}</p>
          </div>
        </div>

        <div className="registrations-section">
          <h2 className="section-title">Event-wise Statistics</h2>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Event Name</th>
                  <th>Registrations</th>
                  <th>Confirmed</th>
                  <th>Pending</th>
                  <th>Revenue</th>
                </tr>
              </thead>
              <tbody>
                {stats?.eventStats && stats.eventStats.length > 0 ? (
                  stats.eventStats.map((event, index) => (
                    <tr key={index}>
                      <td><span className="event-badge">{event.eventName}</span></td>
                      <td>{event.totalRegistrations}</td>
                      <td>{event.confirmedRegistrations}</td>
                      <td>{event.pendingRegistrations}</td>
                      <td>-</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center' }}>No event data available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;
