import React, { useState, useEffect, useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { getRegistrations, updateRegistration, updateRegistrationStatus, deleteRegistration, getEvents, createRegistration } from '../../../utils/adminDashboardAPI';
import AdminLoading from './AdminLoading';
import './RoleDashboard.css';
import ViewRegistrationModal from './ViewRegistrationModal';
import EditRegistrationModal from './EditRegistrationModal';
import AddRegistrationModal from './AddRegistrationModal';

/**
 * Get display value from a registration object, checking multiple possible keys
 * (API/documents may use different field names per event). Display only - no DB logic.
 */
function getDisplayValue(reg, ...keys) {
  if (!reg || typeof reg !== 'object') return '';
  for (const k of keys) {
    const v = reg[k];
    if (v != null && String(v).trim() !== '') return String(v).trim();
  }
  const first = reg.participants && reg.participants[0];
  if (first && typeof first === 'object') {
    for (const k of keys) {
      const v = first[k];
      if (v != null && String(v).trim() !== '') return String(v).trim();
    }
  }
  return '';
}

/** Get email from registration, checking all known and email-like keys. Display only. */
function getDisplayEmail(reg) {
  const main = getDisplayValue(reg, 'emailAddress', 'email', 'teamLeaderEmail', 'teamMember2Email');
  if (main) return main;
  if (reg && typeof reg === 'object') {
    for (const key of Object.keys(reg)) {
      if (key.toLowerCase().includes('email') && typeof reg[key] === 'string' && reg[key].trim() !== '')
        return reg[key].trim();
    }
    const first = reg.participants && reg.participants[0];
    if (first && typeof first === 'object') {
      const fromFirst = first.email || first.emailAddress || '';
      if (String(fromFirst).trim()) return String(fromFirst).trim();
      for (const key of Object.keys(first)) {
        if (key.toLowerCase().includes('email') && typeof first[key] === 'string' && first[key].trim() !== '')
          return first[key].trim();
      }
    }
  }
  return '';
}

const RegistrationsPage = () => {
  const history = useHistory();
  const location = useLocation();
  const [selectedEvent, setSelectedEvent] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewingRegistration, setViewingRegistration] = useState(null);
  const [editingRegistration, setEditingRegistration] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [user, setUser] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [events, setEvents] = useState(['all']);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    pendingPayments: 0,
    confirmed: 0
  });

  // Extract role from pathname
  const role = location.pathname.split('/')[2];

  // Define fetch functions before useEffect hooks
  const fetchEvents = async () => {
    try {
      const result = await getEvents();
      const eventNames = ['all', ...result.events.map(e => e.name)];
      setEvents(eventNames);
    } catch (err) {
      console.error('Error fetching events:', err);
    }
  };

  const fetchRegistrations = useCallback(async () => {
    try {
      setLoading(true);
      const params = {
        limit: 1000 // Fetch up to 1000 registrations
      };
      
      if (selectedEvent !== 'all') {
        params.eventName = selectedEvent;
      }
      
      if (searchTerm) {
        params.search = searchTerm;
      }
      
      console.log('🔍 Fetching registrations with params:', params);
      const result = await getRegistrations(params);
      console.log('📊 API Response:', result);
      console.log('📊 Total from pagination:', result.pagination?.total);
      console.log('📊 Registrations received:', result.registrations?.length);
      
      setRegistrations(result.registrations || []);
      
      // Calculate stats
      const total = result.registrations?.length || 0;
      const pendingPayments = result.registrations?.filter(r => r.paymentStatus === 'pending').length || 0;
      const confirmed = result.registrations?.filter(r => r.registrationStatus === 'confirmed').length || 0;
      
      console.log('📊 Stats calculated:', { total, pendingPayments, confirmed });
      
      setStats({ total, pendingPayments, confirmed });
      setError(null);
    } catch (err) {
      console.error('❌ Error fetching registrations:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [selectedEvent, searchTerm]);

  useEffect(() => {
    const userData = localStorage.getItem('adminUser');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    
    // Fetch initial data
    fetchEvents();
    fetchRegistrations();
  }, [fetchRegistrations]);

  useEffect(() => {
    // Refetch when filters change
    fetchRegistrations();
  }, [selectedEvent, searchTerm, fetchRegistrations]);

  // Dummy registration data - REMOVED, now fetching from API
  // const [registrations, setRegistrations] = useState([...]);

  // const events = ['all', 'Khet', 'FIFA Mobile', 'Combat', 'Hackstrom', 'Codebee'];

  const roleConfig = {
    core: { name: 'Core', color: '#0f766e', canEdit: true, canDelete: true, canAdd: true, canEditRegistration: true, canChangePaymentStatus: true, canChangeRegistrationStatus: true },
    coordinator: { name: 'Coordinator', color: '#2563eb', canEdit: false, canDelete: false, canAdd: false, canEditRegistration: false, canChangePaymentStatus: false, canChangeRegistrationStatus: false },
    volunteer: { name: 'Volunteer', color: '#9333ea', canEdit: false, canDelete: false, canAdd: false, canEditRegistration: false, canChangePaymentStatus: false, canChangeRegistrationStatus: false }
  };

  const config = roleConfig[role] || roleConfig.core;

  const handleBack = () => {
    history.push(`/admin/${role}/dashboard`);
  };

  const handleDelete = async (eventName, id) => {
    if (window.confirm('Are you sure you want to delete this registration?')) {
      try {
        await deleteRegistration(eventName, id);
        await fetchRegistrations(); // Refresh the list
      } catch (err) {
        alert('Error deleting registration: ' + err.message);
      }
    }
  };

  const handleView = (registration) => {
    setViewingRegistration(registration);
  };

  const handleEdit = (registration) => {
    setEditingRegistration(registration);
  };

  const handleSaveEdit = async (id, updatedData) => {
    try {
      // Find the registration to get the event name
      const registration = registrations.find(r => r._id === id);
      if (!registration) {
        alert('Registration not found');
        return;
      }
      
      await updateRegistration(registration.eventName, id, updatedData);
      await fetchRegistrations(); // Refresh the list
      alert('Registration updated successfully!');
    } catch (err) {
      alert('Error updating registration: ' + err.message);
    }
  };

  const handleAddRegistration = async (newRegistration) => {
    try {
      await createRegistration(newRegistration.eventName, newRegistration);
      await fetchRegistrations(); // Refresh the list
      alert('Registration added successfully!');
    } catch (err) {
      alert('Error adding registration: ' + err.message);
    }
  };

  const handleStatusChange = async (eventName, id, field, value) => {
    try {
      const updates = { [field]: value };
      await updateRegistrationStatus(eventName, id, updates);
      
      // Update local state
      setRegistrations(prev => prev.map(reg => 
        reg._id === id ? { ...reg, [field]: value } : reg
      ));
    } catch (err) {
      alert('Error updating status: ' + err.message);
    }
  };

  // Filter by event for coordinator/volunteer - now handled by API
  let filteredRegistrations = registrations;

  // Apply search and event filter - now handled by API, just display what we have
  // filteredRegistrations = filteredRegistrations.filter(reg => {...});

  if (loading) {
    return (
      <div className={`role-dashboard ${role}-dashboard`}>
        <div className="dashboard-wrapper dashboard-wrapper--loading">
          <AdminLoading message="Loading registrations..." roleColor={config.color} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`role-dashboard ${role}-dashboard`}>
        <div className="dashboard-wrapper">
          <div className="admin-error-state">
            <p className="admin-error-message">Error: {error}</p>
            <button type="button" className="admin-error-retry" onClick={fetchRegistrations}>Retry</button>
          </div>
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
            <h1 className="dash-title">Registrations</h1>
            <p className="dash-subtitle">{config.name} • {config.canEdit ? 'Edit Access' : 'View Only'}</p>
          </div>
        </header>

        <div className="stats-grid stats-grid--overview">
          <div className="stat-card stat-card--total">
            <p className="stat-label">Total Registrations</p>
            <p className="stat-value">{stats.total}</p>
          </div>
          <div className="stat-card stat-card--pending">
            <p className="stat-label">Pending Payments</p>
            <p className="stat-value">{stats.pendingPayments}</p>
          </div>
          <div className="stat-card stat-card--confirmed">
            <p className="stat-label">Confirmed</p>
            <p className="stat-value">{stats.confirmed}</p>
          </div>
          <div className="stat-card stat-card--events">
            <p className="stat-label">Events</p>
            <p className="stat-value">{role === 'core' ? events.length - 1 : 1}</p>
          </div>
        </div>

        <div className="controls-bar">
          <input
            type="text"
            placeholder="Search by name, email, or registration number..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {role === 'core' && (
            <select
              className="event-filter"
              value={selectedEvent}
              onChange={(e) => setSelectedEvent(e.target.value)}
            >
              {events.map(event => (
                <option key={event} value={event}>
                  {event === 'all' ? 'All Events' : event}
                </option>
              ))}
            </select>
          )}
          {config.canAdd && (
            <button className="add-btn" onClick={() => setShowAddModal(true)}>+ Add Registration</button>
          )}
        </div>

        <div className="registrations-section section-card">
          <h2 className="section-title">
            {role === 'core' ? 'All Registrations' : `${user?.eventName || 'Event'} Registrations`} ({filteredRegistrations.length})
          </h2>
          <p className="section-subtitle">Search and filter below</p>
          
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Reg. Number</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Contact</th>
                  <th>College</th>
                  {role === 'core' && <th>Event</th>}
                  <th>Payment</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRegistrations.length > 0 ? (
                  filteredRegistrations.map(reg => {
                    const displayName = getDisplayValue(reg, 'fullName', 'full_name', 'name') ||
                                       (reg.participants && reg.participants[0]?.name) ||
                                       reg.teamName ||
                                       '—';
                    const displayEmail = getDisplayEmail(reg) || '—';
                    const displayContact = getDisplayValue(reg, 'contactNumber', 'phone', 'contact') || '—';
                    const displayCollege = getDisplayValue(reg, 'collegeName', 'college', 'institution') || '—';
                    const displayRegNumber = getDisplayValue(reg, 'registrationNumber') || '—';
                    return (
                    <tr key={reg._id}>
                      <td className="reg-number cell-nowrap" title={displayRegNumber}>{displayRegNumber}</td>
                      <td className="name-cell">{displayName}</td>
                      <td className="email-cell" title={displayEmail}>{displayEmail}</td>
                      <td className="contact-cell cell-nowrap" title={displayContact}>{displayContact}</td>
                      <td className="college-cell" title={displayCollege}>{displayCollege}</td>
                      {role === 'core' && (
                        <td className="event-cell" title={reg.eventName || ''}>
                          <span className="event-badge">{reg.eventName || '—'}</span>
                        </td>
                      )}
                      <td>
                        {config.canChangePaymentStatus ? (
                          <select
                            className={`status-select payment-${reg.paymentStatus}`}
                            value={reg.paymentStatus}
                            onChange={(e) => handleStatusChange(reg.eventName, reg._id, 'paymentStatus', e.target.value)}
                          >
                            <option value="pending">Pending</option>
                            <option value="verified">Verified</option>
                            <option value="failed">Failed</option>
                          </select>
                        ) : (
                          <span className={`status-pill payment-${reg.paymentStatus}`}>
                            {reg.paymentStatus}
                          </span>
                        )}
                      </td>
                      <td>
                        {config.canChangeRegistrationStatus ? (
                          <select
                            className={`status-select reg-${reg.registrationStatus}`}
                            value={reg.registrationStatus}
                            onChange={(e) => handleStatusChange(reg.eventName, reg._id, 'registrationStatus', e.target.value)}
                          >
                            <option value="confirmed">Confirmed</option>
                            <option value="pending">Pending</option>
                            <option value="cancelled">Cancelled</option>
                            <option value="waitlist">Waitlist</option>
                          </select>
                        ) : (
                          <span className={`status-pill reg-${reg.registrationStatus}`}>
                            {reg.registrationStatus}
                          </span>
                        )}
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button className="action-btn view-btn" onClick={() => handleView(reg)} title="View Details">👁️</button>
                          {config.canEditRegistration && (
                            <button className="action-btn edit-btn" onClick={() => handleEdit(reg)} title="Edit">✏️</button>
                          )}
                          {config.canDelete && (
                            <button className="action-btn delete-btn" onClick={() => handleDelete(reg.eventName, reg._id)} title="Delete">🗑️</button>
                          )}
                        </div>
                      </td>
                    </tr>
                  )})
                ) : (
                  <tr>
                    <td colSpan={role === 'core' ? 9 : 8} className="table-empty-cell">
                      <span className="empty-state-inline">No registrations found</span>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modals */}
        {viewingRegistration && (
          <ViewRegistrationModal
            registration={viewingRegistration}
            onClose={() => setViewingRegistration(null)}
          />
        )}

        {editingRegistration && config.canEditRegistration && (
          <EditRegistrationModal
            registration={editingRegistration}
            onClose={() => setEditingRegistration(null)}
            onSave={handleSaveEdit}
          />
        )}

        {showAddModal && config.canAdd && (
          <AddRegistrationModal
            onClose={() => setShowAddModal(false)}
            onAdd={handleAddRegistration}
          />
        )}
      </div>
    </div>
  );
};

export default RegistrationsPage;
