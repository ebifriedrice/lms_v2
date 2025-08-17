import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await axios.get('/api/v1/courses');
        setCourses(data.data);
        setLoading(false);
      } catch (err) {
        setError('Could not fetch courses. Please try again later.');
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return <div className="container">Loading...</div>;
  }

  if (error) {
    return <div className="container">{error}</div>;
  }

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <h1>Our Courses</h1>
      <div className="courses-list">
        {courses.length > 0 ? (
          courses.map(course => (
            <div key={course._id} className="course-card" style={{ border: '1px solid #ddd', padding: '1rem', marginBottom: '1rem', borderRadius: '5px' }}>
              <h2>{course.title}</h2>
              <p>{course.description}</p>
              <p><strong>Delivery Mode:</strong> {course.deliveryMode}</p>
              <p><strong>Price:</strong> ${course.price}</p>
            </div>
          ))
        ) : (
          <p>No courses available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default CoursesPage;
