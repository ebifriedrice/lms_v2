import React, { useState, useEffect, useContext } from 'react';
import api from '../utils/api';
import AuthContext from '../context/AuthContext';

const StudentDashboardPage = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        const { data } = await api.get('/auth/enrolledcourses');
        setEnrolledCourses(data.data);
        setLoading(false);
      } catch (err) {
        setError('Could not fetch your courses.');
        setLoading(false);
      }
    };

    fetchEnrolledCourses();
  }, []);

  if (loading) {
    return <div className="container">Loading...</div>;
  }

  if (error) {
    return <div className="container">{error}</div>;
  }

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <h1>Student Dashboard</h1>
      <p>Welcome, {user?.name}!</p>
      <h2>Your Enrolled Courses</h2>
      <div className="courses-list">
        {enrolledCourses.length > 0 ? (
          enrolledCourses.map(course => (
            <div key={course._id} className="course-card" style={{ border: '1px solid #ddd', padding: '1rem', marginBottom: '1rem', borderRadius: '5px' }}>
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              {/* TODO: Add progress bar */}
            </div>
          ))
        ) : (
          <p>You are not enrolled in any courses yet.</p>
        )}
      </div>
    </div>
  );
};

export default StudentDashboardPage;
