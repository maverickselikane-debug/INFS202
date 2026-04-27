import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getStudentById } from '../services/api';

function Details() {
  const { id } = useParams(); // Get the student ID from the URL
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadStudent();
  }, [id]);

  async function loadStudent() {
    try {
      const data = await getStudentById(id);
      if (data.id) {
        setStudent(data);
      } else {
        setError('Student not found');
      }
    } catch (err) {
      setError('Error loading student');
    }
    setLoading(false);
  }

  if (loading) return <p className="loading-text">Loading...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="page-container">
      <button className="btn-back" onClick={() => navigate('/list')}>
        ← Back to List
      </button>

      <div className="profile-card">
        {/* Big avatar */}
        <div className="profile-avatar">
          {student.name.charAt(0).toUpperCase()}
        </div>

        <h2>{student.name}</h2>
        <p className="profile-course">{student.course}</p>

        <div className="profile-details">
          <div className="detail-row">
            <span className="detail-label">Email</span>
            <span>{student.email}</span>
          </div>

          <div className="detail-row">
            <span className="detail-label">Course</span>
            <span>{student.course}</span>
          </div>

          <div className="detail-row">
            <span className="detail-label">Year</span>
            <span>Year {student.year}</span>
          </div>

          <div className="detail-row">
            <span className="detail-label">Phone</span>
            <span>{student.phone || 'Not provided'}</span>
          </div>

          <div className="detail-row">
            <span className="detail-label">Registered</span>
            <span>{new Date(student.created_at).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
