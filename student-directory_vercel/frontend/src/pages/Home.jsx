import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const username = localStorage.getItem('username');

  return (
    <div className="home-container">
      <div className="home-hero">
        <h1>Welcome back, {username}! 👋</h1>
        <p>
          This is the Student Directory app. You can view all students,
          search by name or course, view individual student profiles,
          and add new students.
        </p>
      </div>

      <div className="home-cards">
        <div className="info-card">
          <div className="info-icon">📋</div>
          <h3>View Students</h3>
          <p>Browse the full list of students and search by name or course.</p>
          <button className="btn-primary" onClick={() => navigate('/list')}>
            Go to List
          </button>
        </div>

        <div className="info-card">
          <div className="info-icon">➕</div>
          <h3>Add Student</h3>
          <p>Register a new student into the directory.</p>
          <button className="btn-primary" onClick={() => navigate('/add')}>
            Add Student
          </button>
        </div>

        <div className="info-card">
          <div className="info-icon">🔍</div>
          <h3>Search</h3>
          <p>Find a specific student by name, email or course.</p>
          <button className="btn-primary" onClick={() => navigate('/list')}>
            Search Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
