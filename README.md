# Web Shop Management System

## Project Overview
A web application for managing company resources - orders, customers, and products remotely.

## ✨ Key Features
- Order management system
- Customer database
- Product inventory tracking
- Responsive web interface

## 🛠️ Technology Stack
### Frontend
- React.js (with Vite)
- Material-UI (MUI)
- Node.js

### Backend
- Spring Boot (REST API)
- Java 21

### Database
- MySQL

## ⚙️ System Requirements
- JDK 21
- IDE with Java support (IntelliJ, Eclipse)
- XAMPP (for MySQL and Apache)
- Node.js (for frontend)

## 🚀 Installation Guide

### 1. Database Setup (XAMPP)
1. Install XAMPP from [https://www.apachefriends.org](https://www.apachefriends.org)
2. Start these modules:
   - Apache
   - MySQL
3. Access phpMyAdmin at [http://localhost/phpmyadmin](http://localhost/phpmyadmin)
4. Create a new database named `sales`
5. Import the `sales.sql` file

### 2. Backend Setup (Spring Boot)
1. Install JDK 21 from [Oracle](https://www.oracle.com/java/technologies/downloads/)
2. Open the `backend-spring` folder in your Java IDE
3. Navigate to: `src/main/java/ks_sales_management/api`
4. Run: `SalesManagementApplication.java`

### 3. Frontend Setup (React)
1. Open the `frontend-react` folder in terminal/VS Code
2. Install dependencies:
   ```bash
   npm install
3. Start the development server:
   ```bash
   npm run dev
   ```
Access the app at: http://localhost:5137

## 🔑 Default Login Credentials
- **Username**: admin
- **Password**: admin

## 🚧 TODO & Future Improvements

### JWT Security Enhancements
- [ ] Replace fixed-duration JWT tokens with dynamic expiration  
- [ ] Implement token revocation list (blacklist) for logged-out users  
- [ ] Add refresh token mechanism  
- [ ] Store tokens in HTTP-only cookies (instead of localStorage)  
- [ ] Implement token rotation for sensitive operations  
