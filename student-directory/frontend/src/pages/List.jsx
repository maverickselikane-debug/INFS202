import React, { useState, useEffect } from 'react';
import StudentCard from '../components/StudentCard';
import { getStudents, deleteStudent } from '../services/api';

function List() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Load students when the page opens
  useEffect(() => {
    loadStudents();
  }, []);

  async function loadStudents(searchTerm = '') {
    setLoading(true);
    try {
      const data = await getStudents(searchTerm);
      if (Array.isArray(data)) {
        setStudents(data);
      } else {
        setError('Could not load students');
      }
    } catch (err) {
      setError('Error connecting to server');
    }
    setLoading(false);
  }

  // Search when user types
  function handleSearch(e) {
    const value = e.target.value;
    setSearch(value);
    loadStudents(value);
  }

  async function handleDelete(id) {
    const confirm = window.confirm('Are you sure you want to delete this student?');
    if (!confirm) return;

    try {
      await deleteStudent(id);
      // Remove from list without reloading
      setStudents(students.filter((s) => s.id !== id));
    } catch (err) {
      alert('Error deleting student');
    }
  }

  return (
    <div className="page-container">
      <h2>Student List</h2>

      {/* Search bar */}
      <div className="search-bar">
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search by name, course or email..."
        />
      </div>

      {error && <p className="error-message">{error}</p>}

      {loading ? (
        <p className="loading-text">Loading students...</p>
      ) : students.length === 0 ? (
        <p className="empty-text">No students found.</p>
      ) : (
        <div className="students-grid">
          {students.map((student) => (
            <StudentCard
              key={student.id}
              student={student}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      <p className="count-text">{students.length} student(s) found</p>
    </div>
  );
}

export default List;
