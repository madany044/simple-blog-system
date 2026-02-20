# Simple Blog System (Full Stack)

A minimal full-stack blog application built using:

- Node.js
- Express.js
- PostgreSQL
- JWT Authentication
- Vanilla HTML/CSS/JavaScript frontend

This project demonstrates core backend architecture, relational database design, authentication using JWT, and frontend integration without using heavy frameworks.

---

## 🚀 Features

### Authentication
- User Signup (password hashed using bcrypt)
- User Login (JWT token generation)
- Protected routes using JWT middleware

### Blog System
- Create blog post (authenticated)
- Fetch all posts with author details
- Add comment to specific post (authenticated)
- Relational integrity using foreign keys

### Frontend
- Simple HTML + JavaScript interface
- Uses Fetch API to communicate with backend
- Token stored in localStorage
- Dynamic rendering of posts and comments

---

## 🏗️ Tech Stack

Backend:
- Node.js
- Express.js
- PostgreSQL
- pg (PostgreSQL client)
- bcrypt
- jsonwebtoken
- dotenv

Frontend:
- HTML
- CSS
- Vanilla JavaScript (Fetch API)

---

## 🗄️ Database Schema

### Users Table

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Posts Table

```sql
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Comments Table

```sql
CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🔗 Database Relationships

- One User → Many Posts
- One User → Many Comments
- One Post → Many Comments
- Foreign keys enforce referential integrity
- `ON DELETE CASCADE` ensures dependent records are removed automatically

---

## 🔐 Authentication Flow

1. User logs in
2. Server validates credentials
3. JWT token is generated
4. Token must be included in protected routes:

```
Authorization: Bearer <token>
```

5. Middleware verifies token before allowing access

---

## 📂 Project Structure

```
blog-backend/
│
├── routes/
│   ├── auth.js
│   └── posts.js
│
├── middleware/
│   └── authMiddleware.js
│
├── db.js
├── index.js
├── package.json
├── .env
│
blog-frontend/
└── index.html
```

---

## ⚙️ Installation & Setup

### 1. Clone Repository

```
git clone <repo_url>
cd blog-backend
```

### 2. Install Dependencies

```
npm install
```

### 3. Setup Environment Variables

Create `.env` file:

```
DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/blogdb
JWT_SECRET=your_generated_secret
```

### 4. Create Database

```
psql -U postgres
CREATE DATABASE blogdb;
```

Run the SQL schema provided above.

### 5. Start Server

```
npm run dev
```

Server runs on:
```
http://localhost:5000
```

### 6. Run Frontend

Open:
```
blog-frontend/index.html
```

in browser.

---

## 🧠 Design Decisions

- Used raw SQL instead of ORM for clarity and control
- Used bcrypt for password hashing
- Used JWT for stateless authentication
- Kept frontend minimal to focus on backend architecture
- Used JOIN queries to fetch relational data
- Avoided overengineering for simplicity and maintainability

---

## 🛡️ Validations Implemented

- Required field validation
- Unique email constraint
- Password hashing
- Token validation
- Post existence check before adding comments

---

## 📈 Possible Improvements

- Pagination for posts
- Structured nested JSON response
- Update/Delete post endpoints
- Role-based access control
- Input validation middleware
- Deployment (Render / Railway / AWS)
- Swagger API documentation

---

## 🎯 What This Project Demonstrates

- REST API design
- Relational database modeling
- Authentication & authorization
- Middleware implementation
- Secure password handling
- Full-stack integration

---

## 👨‍💻 Author

Developed as a backend-focused full-stack learning project.