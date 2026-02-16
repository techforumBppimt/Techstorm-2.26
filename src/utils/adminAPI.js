/**
 * Admin API Integration for TechStorm
 * Handles authentication and API calls for admin panel
 */

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export class AdminAPI {
  // Get stored token
  static getToken() {
    return localStorage.getItem('adminToken');
  }

  // Set token in storage
  static setToken(token) {
    localStorage.setItem('adminToken', token);
  }

  // Remove token from storage
  static removeToken() {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
  }

  // Get stored admin data
  static getAdmin() {
    const adminData = localStorage.getItem('adminData');
    return adminData ? JSON.parse(adminData) : null;
  }

  // Set admin data in storage
  static setAdmin(admin) {
    localStorage.setItem('adminData', JSON.stringify(admin));
  }

  // Create headers with auth token
  static getAuthHeaders() {
    const token = this.getToken();
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  }

  // Admin login
  static async login(email, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/admin-auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      
      if (response.ok) {
        this.setToken(data.token);
        this.setAdmin(data.user);
        return { success: true, data };
      }
      
      return { success: false, error: data.error, message: data.message };
    } catch (error) {
      return { success: false, error: 'Network error', message: error.message };
    }
  }

  // Admin logout
  static async logout() {
    try {
      await fetch(`${API_BASE_URL}/admin-auth/logout`, {
        method: 'POST',
        headers: {
          ...this.getAuthHeaders(),
          'Content-Type': 'application/json',
        }
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      this.removeToken();
    }
  }

  // Verify admin token
  static async verify() {
    try {
      const response = await fetch(`${API_BASE_URL}/admin-auth/verify`, {
        headers: this.getAuthHeaders()
      });

      const data = await response.json();
      
      if (response.ok) {
        this.setAdmin(data.user);
        return { success: true, data: data.user };
      }
      
      this.removeToken();
      return { success: false, error: data.error, message: data.message };
    } catch (error) {
      this.removeToken();
      return { success: false, error: 'Network error', message: error.message };
    }
  }

  // Check if admin is authenticated
  static isAuthenticated() {
    return !!this.getToken() && !!this.getAdmin();
  }

  // Check if admin has specific role
  static hasRole(role) {
    const admin = this.getAdmin();
    return admin && admin.role === role;
  }

  // Check if admin has specific permission
  static hasPermission(permission) {
    const admin = this.getAdmin();
    return admin && admin.permissions && admin.permissions.includes(permission);
  }

  // Permission helpers
  static canCreate() {
    return this.hasPermission('create');
  }

  static canRead() {
    return this.hasPermission('read');
  }

  static canUpdate() {
    return this.hasPermission('update');
  }

  static canDelete() {
    return this.hasPermission('delete');
  }

  // Role helpers
  static isCore() {
    return this.hasRole('core');
  }

  static isCoordinator() {
    return this.hasRole('coordinator');
  }

  static isVolunteer() {
    return this.hasRole('volunteer');
  }

  // Get all events
  static async getEvents() {
    try {
      const response = await fetch(`${API_BASE_URL}/admin-auth/events`);
      const data = await response.json();
      return { success: true, data: data.events };
    } catch (error) {
      return { success: false, error: 'Network error', message: error.message };
    }
  }
}

// API Client for admin protected routes
export class AdminApiClient {
  static async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...AdminAPI.getAuthHeaders(),
        ...options.headers
      },
      ...options
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      // Handle authentication errors
      if (response.status === 401) {
        AdminAPI.removeToken();
        window.location.href = '/admin';
        throw new Error('Session expired. Please login again.');
      }

      // Handle authorization errors
      if (response.status === 403) {
        return { 
          success: false, 
          error: 'Access forbidden', 
          message: data.message || 'You do not have permission to access this resource',
          statusCode: 403
        };
      }

      if (!response.ok) {
        throw new Error(data.message || 'Request failed');
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // GET request
  static async get(endpoint, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `${endpoint}?${queryString}` : endpoint;
    return this.request(url);
  }

  // POST request
  static async post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  // PUT request
  static async put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  // DELETE request
  static async delete(endpoint) {
    return this.request(endpoint, {
      method: 'DELETE'
    });
  }
}

export default { AdminAPI, AdminApiClient };
