import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboardPage = () => {
  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <h1>Admin Dashboard</h1>
      <p>Welcome to the admin panel. From here you can manage the entire website and LMS.</p>
      <div className="admin-menu" style={{ marginTop: '2rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>Management Sections</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ marginBottom: '1rem' }}>
            <Link to="/admin/courses" style={{ textDecoration: 'none', background: 'var(--primary-color)', color: 'white', padding: '10px 15px', borderRadius: '5px' }}>
              Manage Courses
            </Link>
          </li>
          <li style={{ marginBottom: '1rem' }}>
            <Link to="/admin/students" style={{ textDecoration: 'none', background: 'var(--primary-color)', color: 'white', padding: '10px 15px', borderRadius: '5px' }}>
              Manage Students
            </Link>
          </li>
          <li style={{ marginBottom: '1rem' }}>
            <Link to="/admin/website" style={{ textDecoration: 'none', background: 'var(--primary-color)', color: 'white', padding: '10px 15px', borderRadius: '5px' }}>
              Manage Website Content
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
