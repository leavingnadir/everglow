# Vendor Management System - Development Setup

## Backend Setup

### Prerequisites
- Java 17+
- Maven 3.6+
- MySQL 8.0+

### Build and Run

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

The backend will run on `http://localhost:7070`

### Configuration
- Edit `src/main/resources/application.properties` to configure database connection
- Ensure MySQL server is running with the `everglow` database

## Frontend Setup

### Prerequisites
- Node.js 16+
- npm or yarn

### Install Dependencies

```bash
cd frontend
npm install
```

### Run Development Server

```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## API Endpoints

### Public Endpoints

- `POST /api/vendors/register` - Register a new vendor
- `GET /api/vendors/{id}` - Get vendor by ID
- `GET /api/vendors/email/{email}` - Get vendor by email
- `GET /api/vendors` - Get all vendors
- `GET /api/vendors/active` - Get active vendors
- `GET /api/vendors/filter/city/{city}` - Get vendors by city
- `GET /api/vendors/filter/business-type/{businessType}` - Get vendors by business type

### Protected Endpoints (Require Authentication)

- `PUT /api/vendors/{id}` - Update vendor information
- `DELETE /api/vendors/{id}` - Delete vendor account

### Admin Endpoints

- `GET /api/vendors/filter/status/{status}` - Get vendors by status
- `PUT /api/vendors/{id}/approve` - Approve vendor registration
- `PUT /api/vendors/{id}/reject` - Reject vendor registration
- `PUT /api/vendors/{id}/suspend` - Suspend vendor account

## Integration with Main Everglow Project

This system is designed to be integrated with the main everglow backend:

1. **Database**: Uses the same `everglow` database
2. **Authentication**: Can be extended to use the same JWT mechanism
3. **CORS**: Configured to accept requests from main backend and frontend
4. **Security**: Uses Spring Security with password encoding

## Key Features

- ✅ Vendor Registration
- ✅ Vendor Profile Management
- ✅ Business Information Management
- ✅ Status Management (PENDING, APPROVED, REJECTED, SUSPENDED)
- ✅ Ratings and Reviews Tracking
- ✅ Filtering by City and Business Type
- ✅ Admin Approval Workflow

## Next Steps

1. Configure database connection settings
2. Run backend Spring Boot application
3. Install and run frontend development server
4. Test API endpoints using Postman or similar tool
5. Integrate with main everglow authentication system
6. Deploy to production environment
