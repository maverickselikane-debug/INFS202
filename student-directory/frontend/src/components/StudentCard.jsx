import React from 'react';
import { useNavigate } from 'react-router-dom';

function StudentCard({ student, onDelete }) {
  const navigate = useNavigate();

  // Pick a color based on year
  const yearColors = {
    1: '#4CAF50',
    2: '#2196F3',
    3: '#FF9800',
    4: '#9C27B0',
  };

  const color = yearColors[student.year] || '#607D8B';

  return (
    <div className="student-card">
      {/* Avatar circle with initials */}
      <div className="student-avatar" style={{ backgroundColor: color }}>
        {student.name.charAt(0).toUpperCase()}
      </div>

      <div className="student-info">
        <h3>{student.name}</h3>
        <p>{student.course}</p>
        <p className="student-email">{student.email}</p>
        <span className="year-badge">Year {student.year}</span>
      </div>

      <div className="card-actions">
        <button
          className="btn-view"
          onClick={() => navigate(`/details/${student.id}`)}
        >
          View
        </button>
        <button
          className="btn-delete"
          onClick={() => onDelete(student.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default StudentCard;
