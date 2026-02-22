import React from 'react';
import './AdminLoading.css';

/**
 * Shared loading component for admin pages.
 * Replaces the old text-only "Loading..." UI with a proper spinner and message.
 * No database/API logic - presentation only.
 */
const AdminLoading = ({ message = 'Loading...', roleColor }) => {
  return (
    <div className="admin-loading" style={roleColor ? { '--admin-loading-accent': roleColor } : undefined}>
      <div className="admin-loading-spinner" aria-hidden="true" />
      <p className="admin-loading-message">{message}</p>
    </div>
  );
};

export default AdminLoading;
