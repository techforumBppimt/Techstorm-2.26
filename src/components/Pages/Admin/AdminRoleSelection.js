import React from 'react';
import { useHistory } from 'react-router-dom';
import './AdminRoleSelection.css';

const AdminRoleSelection = () => {
  const history = useHistory();

  const roles = [
    {
      name: 'Core',
      role: 'core',
      description: 'Full system access with all permissions',
      icon: '🔴',
      color: '#ff4444',
      permissions: ['Create', 'Read', 'Update', 'Delete'],
      path: '/admin/core'
    },
    {
      name: 'Coordinator',
      role: 'coordinator',
      description: 'Event management with read and update access',
      icon: '🟡',
      color: '#ffaa00',
      permissions: ['Read', 'Update'],
      path: '/admin/coordinator'
    },
    {
      name: 'Volunteer',
      role: 'volunteer',
      description: 'Read-only access to view information',
      icon: '🟢',
      color: '#44ff44',
      permissions: ['Read'],
      path: '/admin/volunteer'
    }
  ];

  const handleRoleClick = (path) => {
    history.push(path);
  };

  return (
    <div className="admin-role-selection">
      <div className="admin-container">
        <div className="admin-header">
          <h1 className="admin-title">TechStorm Admin Portal</h1>
          <p className="admin-subtitle">Select your role to continue</p>
        </div>

        <div className="role-cards-container">
          {roles.map((role) => (
            <div
              key={role.role}
              className="role-card"
              onClick={() => handleRoleClick(role.path)}
              style={{ '--role-color': role.color }}
            >
              <div className="role-icon">{role.icon}</div>
              <h2 className="role-name">{role.name}</h2>
              <p className="role-description">{role.description}</p>
              <div className="role-permissions">
                <h3>Permissions:</h3>
                <ul>
                  {role.permissions.map((permission) => (
                    <li key={permission}>
                      <span className="permission-check">✓</span> {permission}
                    </li>
                  ))}
                </ul>
              </div>
              <button className="role-button">
                Login as {role.name}
                <span className="arrow">→</span>
              </button>
            </div>
          ))}
        </div>

        <div className="admin-footer">
          <p>© 2026 TechStorm. Authorized personnel only.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminRoleSelection;
