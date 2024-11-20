# Task Management System

A secure and scalable task management system built with Node.js, Express, and MySQL. This system allows teams and individuals to effectively manage their projects and tasks with features like user authentication, project management, task tracking, and more.

## Features

- 🔐 Secure Authentication
  - JWT-based authentication
  - Role-based access control
  - Password hashing
  - Rate limiting

- 📚 Project Management
  - Create, read, update, and delete projects
  - Project categorization
  - Project status tracking
  - Multi-user collaboration

- ✅ Task Management
  - Create and assign tasks
  - Task priorities and deadlines
  - Status tracking
  - Task filtering and sorting

- 🔍 Search & Filter
  - Advanced search capabilities
  - Multiple filter options
  - Sorting functionality

- 📊 Additional Features
  - Pagination
  - Data export
  - Activity logging
  - User management

## Prerequisites

- Node.js (v14 or higher)
- MySQL (v5.7 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/task-management-system.git
cd task-management-system
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
NODE_ENV=development
PORT=3000
API_VERSION=v1

# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_NAME=task_management
DB_USER=root
DB_PASSWORD=your_password

# JWT Configuration
JWT_SECRET=your-super-secret-key-change-this
JWT_EXPIRES_IN=24h

# Bcrypt Configuration
BCRYPT_SALT_ROUNDS=10

# Logging Configuration
LOG_LEVEL=info
```

4. Set up the database:
```bash
# Create database
npx sequelize-cli db:create

# Run migrations
npx sequelize-cli db:migrate

# (Optional) Run seeders
npx sequelize-cli db:seed:all
```

## Running the Application

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

### Tests
```bash
npm test
```

## API Documentation

### Authentication

#### Register User
```http
POST /api/v1/auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "secure_password123"
}
```

#### Login
```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "secure_password123"
}
```

### Projects

#### Create Project
```http
POST /api/v1/projects
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "New Project",
  "description": "Project description"
}
```

#### Get Projects
```http
GET /api/v1/projects
Authorization: Bearer <token>
```

#### Get Project by ID
```http
GET /api/v1/projects/:id
Authorization: Bearer <token>
```

#### Update Project
```http
PUT /api/v1/projects/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Updated Project Name",
  "description": "Updated description"
}
```

#### Delete Project
```http
DELETE /api/v1/projects/:id
Authorization: Bearer <token>
```

### Tasks

#### Create Task
```http
POST /api/v1/tasks
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "New Task",
  "description": "Task description",
  "projectId": "project-uuid",
  "dueDate": "2024-12-31",
  "priority": "high"
}
```

## Project Structure
```
task-management-system/
├── src/
│   ├── config/          # Configuration files
│   ├── controllers/     # Request handlers
│   ├── middleware/      # Custom middleware
│   ├── models/          # Database models
│   ├── routes/          # Route definitions
│   ├── services/        # Business logic
│   ├── utils/           # Utility functions
│   └── app.js          # App entry point
├── tests/              # Test files
├── .env.example        # Environment variables example
├── .gitignore
├── package.json
└── README.md
```

## Security Features

- JWT Authentication
- Password Hashing (bcrypt)
- Rate Limiting
- XSS Protection
- SQL Injection Prevention
- CORS Protection
- Request Validation
- Input Sanitization

## Database Schema

### Users
- id (UUID)
- username (String)
- email (String)
- password (String)
- role (Enum: 'admin', 'user')
- lastLogin (DateTime)
- createdAt (DateTime)
- updatedAt (DateTime)

### Projects
- id (UUID)
- name (String)
- description (Text)
- status (Enum: 'active', 'archived')
- createdBy (UUID)
- createdAt (DateTime)
- updatedAt (DateTime)
- deletedAt (DateTime)

### Tasks
- id (UUID)
- title (String)
- description (Text)
- dueDate (DateTime)
- priority (Enum: 'low', 'medium', 'high')
- status (Enum: 'todo', 'in_progress', 'completed')
- projectId (UUID)
- assignedTo (UUID)
- createdBy (UUID)
- createdAt (DateTime)
- updatedAt (DateTime)
- deletedAt (DateTime)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Error Handling

The application uses a centralized error handling mechanism:

- `ApiError` class for consistent error responses
- Validation errors with detailed messages
- Development vs. Production error details
- Error logging with Winston

## Testing

The project uses Jest for testing:

```bash
# Run all tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test -- tests/auth.test.js
```

## Logging

Logging is implemented using Winston:

- Request/Response logging
- Error logging
- Performance monitoring
- Separate logging for development and production

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@yourdomain.com or create an issue in the repository.