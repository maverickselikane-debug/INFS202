# Student Directory App

**Student Name:** [Your Name Here]  
**Module:** INFS 202  
**Project:** Midterm Project (Frontend + Backend)

---

## Description

A full-stack web application that allows users to manage a directory of students.  
Users must register and log in before they can access the app.  
Once logged in, they can view all students, search by name or course, view a student's full profile, add new students, and delete students.

---

## Technologies Used

### Frontend
- React
- React Router DOM (for navigation)
- CSS (custom styles)

### Backend
- Node.js
- Express.js
- SQLite3 (database — stored as a local file `students.db`)
- bcryptjs (password hashing)
- jsonwebtoken (JWT authentication)
- dotenv (environment variables)

---

## Project Structure

```
student-directory/
│
├── backend/
│   ├── middleware/
│   │   └── auth.js          # JWT auth check
│   ├── routes/
│   │   ├── auth.js          # /api/auth/login and /register
│   │   └── students.js      # /api/students CRUD routes
│   ├── database.js          # SQLite setup and sample data
│   ├── server.js            # Main Express server
│   ├── .env                 # Environment variables
│   └── package.json
│
└── frontend/
    ├── public/
    │   └── index.html
    └── src/
        ├── components/
        │   ├── Navbar.jsx
        │   └── StudentCard.jsx
        ├── pages/
        │   ├── Login.jsx
        │   ├── Register.jsx
        │   ├── Home.jsx
        │   ├── List.jsx
        │   ├── Details.jsx
        │   └── AddStudent.jsx
        ├── services/
        │   └── api.js        # All API fetch calls
        ├── App.jsx
        ├── App.css
        └── index.js
```

---

## How to Run the Project

### Step 1 – Run the Backend

Open a terminal and go into the backend folder:

```bash
cd backend
npm install
node server.js
```

You should see:
```
Connected to SQLite database
Server running on http://localhost:5000
Sample students added
```

### Step 2 – Run the Frontend

Open a **second** terminal and go into the frontend folder:

```bash
cd frontend
npm install
npm start
```

The app will open at **http://localhost:3000**

---

## API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | /api/auth/register | Register a new user | No |
| POST | /api/auth/login | Login and get token | No |
| GET | /api/students | Get all students (supports ?search=) | Yes |
| GET | /api/students/:id | Get one student by ID | Yes |
| POST | /api/students | Add a new student | Yes |
| DELETE | /api/students/:id | Delete a student | Yes |

---

## App Routes (Frontend)

| Route | Page |
|-------|------|
| /login | Login page |
| /register | Register page |
| /home | Home page |
| /list | Student list with search |
| /details/:id | Student profile page |
| /add | Add new student form |

---

## Notes

- The SQLite database is automatically created when you first run the server. No setup needed.
- 5 sample students are added automatically so the app is not empty.
- All routes except login and register require a valid JWT token.
- Passwords are hashed using bcryptjs before being saved to the database.
