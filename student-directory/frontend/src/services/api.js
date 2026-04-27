// This file handles all the API calls to our backend
const API_URL = 'http://localhost:5000/api';

// Helper function to get the token from localStorage
function getToken() {
  return localStorage.getItem('token');
}

// AUTH
export async function loginUser(username, password) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  return response.json();
}

export async function registerUser(username, password) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  return response.json();
}

// STUDENTS
export async function getStudents(search = '') {
  const url = search
    ? `${API_URL}/students?search=${search}`
    : `${API_URL}/students`;

  const response = await fetch(url, {
    headers: { authorization: getToken() },
  });
  return response.json();
}

export async function getStudentById(id) {
  const response = await fetch(`${API_URL}/students/${id}`, {
    headers: { authorization: getToken() },
  });
  return response.json();
}

export async function addStudent(studentData) {
  const response = await fetch(`${API_URL}/students`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: getToken(),
    },
    body: JSON.stringify(studentData),
  });
  return response.json();
}

export async function deleteStudent(id) {
  const response = await fetch(`${API_URL}/students/${id}`, {
    method: 'DELETE',
    headers: { authorization: getToken() },
  });
  return response.json();
}
