<img width="1280" height="320" alt="Github Banner" src="https://github.com/user-attachments/assets/568267df-ef81-4384-821c-a06260f8e782" />

# 💍 EverGlow – Wedding Planning & Vendor Booking System

## 📌 Project Overview

**EverGlow** is a full-stack web application designed to simplify wedding planning by connecting users with verified vendors such as photographers, venues, decorators, and caterers. The system provides a **beautiful and user-friendly interface** that enhances the overall user experience while managing wedding services efficiently.

The platform includes key modules such as **User Management, Vendor Management, Package Management, Booking Management, Payment & Invoice handling, and Review & Feedback systems**. These features allow users to seamlessly browse vendors, select suitable packages, make bookings, complete payments, and share their experiences, ensuring a smooth and organized wedding planning process.

---

## 🛠️ Technologies Used

### 🔹 Frontend

* Vite
* Tailwind CSS
* JavaScript

### 🔹 Backend

* Java Spring Boot
* Spring Web (REST APIs)

### 🔹 Database

* Neon Console (Postgresql)

### 🔹 Tools

* IntelliJ IDEA
* Postman (API Testing)
* Git & GitHub (Version Control)

---

## 📁 Project Structure

```
everglow/
├── frontend/       # React + Vite app
└── backend/        # Spring Boot app
```

---
<img width="1523" height="825" alt="Capture" src="https://github.com/user-attachments/assets/c610c2fb-8eb2-4292-b7d6-c6418e57c354" />

👉 Open Spring Initializr  
https://start.spring.io/


### ⚙️ Project Configuration

- **Project** → Maven
- **Language** → Java
- **Spring Boot** → Latest stable (3.x)
- **Group** → `com.weddingplanning`
- **Artifact** → `backend`
- **Name** → `backend`
- **Package name** → `com.weddingplanning`
- **Packaging** → Jar
- **Java Version** → 17 ✅

### 📦 Dependencies (IMPORTANT)

Add the following:

### ✅ Required
- Spring Web
- Spring Data JPA
- PostgreSQL Driver
- Spring Security
- Lombok
- Validation

### ➕ Optional
- Spring Boot DevTools

Click:

👉 **Generate → Download ZIP**

---

## 🎨 Frontend Setup

```bash
cd frontend
```
```
npm install
```
```
npm run dev
```

Frontend runs at: **http://localhost:5173**

---

## ☕ Backend Setup

```bash
cd backend
```

```
mvnw.cmd install
```

```
./mvnw install
```

```
mvnw.cmd spring-boot:run
```

```
./mvnw spring-boot:run
```

Backend runs at: **http://localhost:8081**

### Other Backend Commands

```bash
./mvnw clean install
```

---

## 🗄️ Database Setup (Neon PostgreSQL)

1. Go to [console.neon.tech](https://console.neon.tech) and create a project
2. Open the **SQL Editor** and run the following to create the payments table:
```sql
CREATE TABLE IF NOT EXISTS payments (
    id             BIGSERIAL PRIMARY KEY,
    booking_id     BIGINT        NOT NULL,
    vendor_name    VARCHAR(255),
    amount         NUMERIC(10,2) NOT NULL,
    payment_method VARCHAR(50),
    status         VARCHAR(50)   DEFAULT 'PENDING',
    payment_date   DATE,
    notes          TEXT,
    created_at     TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
    updated_at     TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
);
```

3. Copy your connection details and update `backend/src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:postgresql://<YOUR_NEON_HOST>/neondb?sslmode=require
spring.datasource.username=<YOUR_USERNAME>
spring.datasource.password=<YOUR_PASSWORD>
```

---

## 🔗 API Endpoints

Base URL: `http://localhost:8081/api`

| Method   | Endpoint                       | Description           |
|----------|--------------------------------|-----------------------|
| `GET`    | `/items`                       | Get all items         |
| `GET`    | `/items/{id}`                  | Get item by ID        |
| `GET`    | `/items/category/{categoryId}` | Get items by category |
| `POST`   | `/items`                       | Create new item       |
| `PUT`    | `/items/{id}`                  | Update existing item  |
| `DELETE` | `/items/{id}`                  | Delete an item        |
 

---

# 🧰 Git Commands

A quick reference for the most commonly used Git commands.

## ⚙️ Initial Setup

```bash
git config --global user.name "Your Name"        # Set your name
git config --global user.email "you@email.com"   # Set your email
```

## 📁 Starting a Repository

```bash
git init                    # Initialize a new local repository
git clone <url>             # Clone a remote repository to your machine
```

## 📸 Staging & Committing

```bash
git status                  # Check the status of your working directory
git add .                   # Stage all changed files
git commit -m "message"     # Commit staged changes with a message
```

## 🌐 Working with Remotes

```bash
git remote -v                        # List remote connections
git remote add main <url>            # Add a remote called origin
git push origin main                 # Push branch to remote
git push -u origin main              # Push and set upstream tracking
git pull                             # Fetch and merge from remote
```

---

## Members EndPoints

Package Management Admin
```
http://localhost:5173/admin/packages
```
Package Management User 
```
http://localhost:5173/packages
```

---

## 👨‍💻 Contributors

| Name                | StudentID                           | System              |
|---------------------|-------------------------------------|---------------------|
| Ranaweera R.H.H.V.  | IT25102853 | Payment Management  |
| Isaipriya K.        | IT25103512 | Booking Management  |
| Gamage C.M.         | IT25101509 | Feedback Management |
| Mathushan K.        | IT25103450 | User Management     |
| Sandanayake T.U.A.  | IT25101625 | Vendor Management   |
| Jayasinghe W.M.S.B. | IT25100771 | Package Management  |


This project is developed for academic purposes only.
