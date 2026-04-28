import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addStudent } from '../services/api';

function AddStudent() {
  const navigate = useNavigate();

  // Form fields stored in state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [course, setCourse] = useState('');
  const [year, setYear] = useState('');
  const [phone, setPhone] = useState('');

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Validate the form before submitting
  function validate() {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!email.includes('@')) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!course.trim()) {
      newErrors.course = 'Course is required';
    }

    if (!year) {
      newErrors.year = 'Year is required';
    }

    return newErrors;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSuccessMessage('');

    // Run validation
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const data = await addStudent({ name, email, course, year: parseInt(year), phone });

      if (data.id) {
        setSuccessMessage('Student added successfully!');
        // Clear the form
        setName('');
        setEmail('');
        setCourse('');
        setYear('');
        setPhone('');

        // Go to the student list after 1.5 seconds
        setTimeout(() => navigate('/list'), 1500);
      } else {
        setErrors({ submit: data.message || 'Failed to add student' });
      }
    } catch (err) {
      setErrors({ submit: 'Error connecting to server' });
    }

    setLoading(false);
  }

  return (
    <div className="page-container">
      <h2>Add New Student</h2>

      {successMessage && <p className="success-message">{successMessage}</p>}
      {errors.submit && <p className="error-message">{errors.submit}</p>}

      <div className="form-card">
        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Full Name *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Alice Mokoena"
            />
            {errors.name && <span className="field-error">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label>Email *</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. alice@student.ac.bw"
            />
            {errors.email && <span className="field-error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label>Course *</label>
            <select value={course} onChange={(e) => setCourse(e.target.value)}>
              <option value="">-- Select a course --</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Information Systems">Information Systems</option>
              <option value="Business IT">Business IT</option>
              <option value="Software Engineering">Software Engineering</option>
              <option value="Data Science">Data Science</option>
            </select>
            {errors.course && <span className="field-error">{errors.course}</span>}
          </div>

          <div className="form-group">
            <label>Year *</label>
            <select value={year} onChange={(e) => setYear(e.target.value)}>
              <option value="">-- Select year --</option>
              <option value="1">Year 1</option>
              <option value="2">Year 2</option>
              <option value="3">Year 3</option>
              <option value="4">Year 4</option>
            </select>
            {errors.year && <span className="field-error">{errors.year}</span>}
          </div>

          <div className="form-group">
            <label>Phone (optional)</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. 71234567"
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Adding...' : 'Add Student'}
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => navigate('/list')}
            >
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default AddStudent;
