# 💍 EverGlow – Wedding Planning & Vendor Booking System

## 📌 Project Overview

**EverGlow** is a full-stack web application designed to simplify wedding planning by connecting users with verified vendors such as photographers, venues, decorators, and caterers. The system allows users to browse vendors, make bookings, and manage wedding services efficiently.

---

## 🛠️ Technologies Used

### 🔹 Frontend

* Next.js (React Framework)
* Tailwind CSS
* JavaScript (ES6+)

### 🔹 Backend

* Java Spring Boot
* Spring Web (REST APIs)
* Spring Data JPA

### 🔹 Database

* MySQL

### 🔹 Tools

* IntelliJ IDEA (Backend)
* VS Code (Frontend)
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

## ⚙️ Installation & Setup

### 🔹 Prerequisites

* Java JDK 17+
* Node.js (v18+)
* MySQL Server
* IntelliJ IDEA / VS Code


### 🔹 Backend Setup (Spring Boot)

1. Open `backend` folder in IntelliJ
2. Configure database in `application.properties`:

```
spring.datasource.url=jdbc:mysql://localhost:3306/everglow_db
spring.datasource.username=root
spring.datasource.password=yourpassword

spring.jpa.hibernate.ddl-auto=update
```

3. Run the Spring Boot application

Backend runs on: `http://localhost:8080`


### 🔹 Frontend Setup (Next.js)

1. Navigate to frontend folder:

```
cd frontend
```

2. Install dependencies:

```
npm install
```

3. Run the development server:

```
npm run dev
```

Frontend runs on: `http://localhost:3000`

---

## 📸 Screenshots


---

## 📄 License

*Ranaweera R.H.H.V.  - IT25102853*  
*Isaipriya K. - IT25103512*  
*Gamage C.M. - IT25101509*  
*Mathushan K.  - IT25103450*  
*Sandanayake T.U.A. - IT25101625*  
*Jayasinghe W M S B  - IT25100771*


This project is developed for academic purposes only.