import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import './index.css';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import TeamPage from './pages/TeamPage';
import BlogPage from './pages/BlogPage';
import CoursesPage from './pages/CoursesPage';
import ContactPage from './pages/ContactPage';
import GalleryPage from './pages/GalleryPage';
import SignInPage from './pages/SignInPage';
import StudentDashboardPage from './pages/StudentDashboardPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Switch>
            {/* Public Routes */}
            <Route path="/" exact component={HomePage} />
            <Route path="/about" component={AboutPage} />
            <Route path="/team" component={TeamPage} />
            <Route path="/blog" component={BlogPage} />
            <Route path="/courses" component={CoursesPage} />
            <Route path="/contact" component={ContactPage} />
            <Route path="/gallery" component={GalleryPage} />
            <Route path="/login" component={SignInPage} />

            {/* Student Routes */}
            <PrivateRoute path="/dashboard" component={StudentDashboardPage} />

            {/* Admin Routes */}
            <AdminRoute path="/admin" component={AdminDashboardPage} />
          </Switch>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
