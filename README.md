#  Blog Project

## Features and Requirements

### 1. User Roles

Admin: 
- Can delete any blog.
- Can block any user.
- Cannot update any blog.

User:
- Can register and log in.
- Can create blogs (only when logged in).
- Can update and delete their own blogs.

### 2. Authentication & Authorization

Authentication:
- Users must log in to perform write, update and delete operations.
  
Authorization:
- Admin and User roles must be differentiated and secured

### 3. Blog API
- A public API for reading blogs:
  
  - Includes blog title, content, author details & other necessary information.
  - Supports search, sorting and filtering functionalities.

 
## Technologies

- TypeScript
- Node.js
- Express.js
- MongoDB with Mongoose
    
 
## API Endpoints

### 1. Authentication

1.1 Register User

POST `/api/auth/register`

Request Body:
```
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

1.2 Login User

POST `/api/auth/login`

Request Body:
```
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

### 2. Blog Management

2.1 Create Blog

POST `/api/blogs`

Request Header: `Authorization: Bearer <token>`

Request Body:
```
{
  "title": "My First Blog",
  "content": "This is the content of my blog."
}
```

2.2 Update Blog

PATCH `/api/blogs/:id`

Request Header: `Authorization: Bearer <token>`

Request Body:
```
{
  "title": "Updated Blog Title",
  "content": "Updated content."
}
```

2.3 Delete Blog

DELETE `/api/blogs/:id`

Request Header: `Authorization: Bearer <token>`

2.4 Get All Blogs (Public)

GET `/api/blogs`

Query Parameters:

- search: Search blogs by title or content (e.g., search=blogtitle).
- sortBy: Sort blogs by specific fields such as createdAt or title (e.g., sortBy=title).
- sortOrder: Defines the sorting order. Accepts values asc (ascending) or desc (descending). (e.g., sortOrder=desc).
- filter: Filter blogs by author ID (e.g., author=authorId).

Example Request URL:

```

/api/blogs?search=technology&sortBy=createdAt&sortOrder=desc&filter=60b8f42f9c2a3c9b7cbd4f18

```

### 3. Admin Actions

3.1 Block User

PATCH `/api/admin/users/:userId/block`

Request Header: `Authorization: Bearer <admin_token>`

3.2 Delete Blog

PATCH `/api/admin/blogs/:id`

Request Header: `Authorization: Bearer <admin_token>`


##  Error Handling

### Common Error Response Format

To maintain consistency across all API endpoints, the following error response structure used:

```
{
  "success": false,
  "message": "Error message describing the issue",
  "statusCode": 400, // or other relevant HTTP status code
  "error": {"details": "Additional error details, if applicable"},
  "stack": "error stack trace, if available"
}
```



