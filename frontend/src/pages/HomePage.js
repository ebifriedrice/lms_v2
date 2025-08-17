import React from 'react';

const HomePage = () => {
  return (
    <div className="container">
      {/* Hero Section */}
      <section className="hero" style={{ padding: '4rem 0', textAlign: 'center' }}>
        <h1>Welcome to Our LMS Platform</h1>
        <p>Your journey to knowledge starts here.</p>
        <button className="btn" style={{ background: 'var(--primary-color)', color: 'var(--white-color)', padding: '0.75rem 1.5rem', borderRadius: '5px', border: 'none', cursor: 'pointer' }}>
          Explore Courses
        </button>
      </section>

      {/* Why Us Section */}
      <section className="why-us" style={{ padding: '4rem 0' }}>
        <h2>Why Choose Us?</h2>
        <p>We provide high-quality courses with expert instructors.</p>
      </section>

      {/* Featured Courses Section */}
      <section className="featured-courses" style={{ padding: '4rem 0' }}>
        <h2>Featured Courses</h2>
        <p>Placeholder for featured course cards.</p>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials" style={{ padding: '4rem 0' }}>
        <h2>What Our Students Say</h2>
        <p>Placeholder for testimonials from Google Reviews.</p>
      </section>
    </div>
  );
};

export default HomePage;
