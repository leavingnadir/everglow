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
 ├── backend/
 │   ├── src/main/java/
 │   │   ├── controller/
 │   │   ├── service/
 │   │   ├── repository/
 │   │   └── model/
 │   ├── resources/
 │   │   └── application.properties
 │   └── pom.xml
 │
 └── frontend/
     ├── app/
     ├── components/
     ├── pages/
     ├── styles/
     └── package.json
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

### 🔹Backend setup (Springboot, Maven , Java)

Extract the ZIP and move it into your project structure:
```
spring.datasource.url=jdbc:mysql://localhost:3306/everglow_db
spring.datasource.username=root
spring.datasource.password=yourpassword

spring.jpa.hibernate.ddl-auto=update
```

3. Run the Spring Boot application

Backend runs on: `http://localhost:8080`


### 🔹 Frontend Setup (React, TailwindCSS, Vite)

1. Navigate to frontend folder:

```
cd frontend
```

2. Install dependencies:

```
npm install
npm install react-router-dom
```

3. Run the development server:

```
npm run dev
```

Frontend runs on: `http://localhost:5173`

---

## 📄 License

*Ranaweera R.H.H.V.  - IT25102853*  
*Isaipriya K. - IT25103512*  
*Gamage C.M. - IT25101509*  
*Mathushan K.  - IT25103450*  
*Sandanayake T.U.A. - IT25101625*  
*Jayasinghe W M S B  - IT25100771*


This project is developed for academic purposes only.
