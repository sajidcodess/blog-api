# Blog API

## Overview
This project provides a robust RESTful API designed to power a blogging platform. It offers essential features for creating, reading, updating, and deleting (CRUD) blog posts while ensuring secure user management through email-based authentication and authorization.

### Key Features:
- **User Authentication & Authorization:** Secure user registration, login, and email verification to protect user accounts and content.
- **Blog Management:** Full CRUD operations for blog posts, allowing users to create, edit, update, and delete their own content.
- **Role-Based Access Control:** Ensures that only authenticated and verified users can manage their blogs, with appropriate access restrictions in place.
- **Data Validation:** Enforces data integrity by validating inputs, ensuring that only correctly formatted data is accepted by the API.
- **Security:** Implements industry-standard security practices, including password hashing and JWT tokens, to protect user data and API endpoints.

This API serves as the backend for a blogging website and can be easily integrated into front-end applications or extended with additional features to suit your project's needs.



### Steps to Install

1. **Clone the Repository**

   Clone the repository to your local machine using the following command:

   ```bash
   git clone https://github.com/yourusername/your-repo-name.git
   ```
2. **Install Dependencies**

   ```bash
   npm install
   
   -- Navigate to the proejct folder and can use the below command to start the server.
   npm run dev

   ```
3. **Environment Variables

   ```bash
        PORT=8000
        DB_CONNECTION_STRING="mongodb_connection_string"
        JWT_SECRET="MY_JWT_SECRET_TOKEN"
        MY_EMAIL="sajidvlog616@gmail.com"
        MY_EMAIL_APP_PASSWORD="An_Email_APP_password_or_your_email_password_that_is_use_to_send_email_for_verification"
   ```
   

## API Endpoints

### BaseURL
-- http://localhost:8000/api

### Authentication Endpoints

#### 1. Register

- **Endpoint:** `POST /api/auth/register`
- **Description:** Registers a new user.
- **Request Body:**
    ```json
    {
      "username": "string",
      "email": "string",
      "password": "string"
    }
    ```
- **Response:**
  - **201 Created:** User successfully registered.
  - **400 Bad Request:** Validation error or missing fields.
  - **403 Forbidden:** User with the same email or username already exists.

#### 2. Login

- **Endpoint:** `POST /api/auth/login`
- **Description:** Authenticates a user and returns a JWT token.
- **Request Body:**
    ```json
    {
      "email": "string",
      "password": "string"
    }
    ```
- **Response:**
  - **200 OK:** Returns the JWT token, that can be used in the headers (Authorization: Bearer {token}) to perform crud on your post.
    ```json
    {
      "token": "jwt-token"
    }
    ```
  - **401 Unauthorized:** Invalid credentials.
  - **400 Bad Request:** Missing email or password.

#### 3. Verify Email

- **Endpoint:** `GET /api/auth/verify-email?token={jwt}`
- **Description:** Verifies a user's email address.
- **Request Parameters:** 
  - **token**: The JWT token sent to the user's email.
- **Response:**
  - **200 OK:** Email successfully verified.
  - **400 Bad Request:** Invalid or expired token.

### Blog Endpoints

#### 4. Get All Blogs

- **Endpoint:** `GET /api/blogs`
- **Description:** Retrieves all blog posts.
- **Response:**
  - **200 OK:** Returns an array of blog posts.
    ```json
    [
      {
        "_id": "string",
        "title": "string",
        "author": "string",
        "content": "string",
        "tags": ["string"],
        "createdAt": "date",
        "updatedAt": "date"
      }
    ]
    ```
  - **500 Issues in the Server:** 

#### 5. Create Blog

- **Endpoint:** `POST /api/blogs/create`
- **Description:** Creates a new blog post.
- **Request Body:**
    ```json
    {
      "title": "string",
      "author": "string",
      "content": "string",
      "tags": ["string"]
    }
    ```
- **Response:**
  - **201 Created:** Blog successfully created.
  - **400 Bad Request:** Validation error or missing fields.
  - **401 Unauthorized:** If the user is not logged in or token in the request header is invalid or expired.

#### 6. Update Blog

- **Endpoint:** `PUT /api/blogs/update/:id`
- **Description:** Updates an existing blog post by ID param.
- **Request Parameters:** 
  - **id**: The ID of the blog post to update.
- **Request Body:**
    ```json
    {
      "title": "string",
      "content": "string",
      "tags": ["string"],
      "author": "string"
    }
    ```
- **Response:**
  - **200 OK:** Blog successfully updated.
  - **404 Not Found:** Blog post with the given ID not found.
  - **400 Bad Request:** Validation error or missing fields.
  - **401 Unauthorized:** If the user is not logged in or token is invalid.

#### 7. Delete Blog

- **Endpoint:** `DELETE /api/blogs/:id`
- **Description:** Deletes a blog post.
- **Request Parameters:** 
  - **id**: The ID of the blog post to delete.
- **Response:**
  - **200 OK:** Blog successfully deleted.
  - **404 Not Found:** Blog post with the given ID not found.
  - **401 Unauthorized:** If the user is not logged in or token is invalid.


## Thanks You.
