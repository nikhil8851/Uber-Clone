# API Documentation: `/register` Endpoint

## Endpoint
**POST** `/user/register`

## Description
This endpoint is used to register a new user in the system. It validates the input data, hashes the password, and stores the user information in the database.

---

## Request Body
The following fields are required in the request body:

| Field               | Type   | Description                                      | Validation                          |
|---------------------|--------|--------------------------------------------------|-------------------------------------|
| `fullname.firstname`| String | First name of the user                           | Minimum 3 characters                |
| `fullname.lastname` | String | Last name of the user                            | Minimum 3 characters                |
| `email`             | String | Email address of the user                        | Must be a valid email format        |
| `password`          | String | Password for the user account                    | Minimum 6 characters                |

### Example Request Body
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "johndoe@example.com",
  "password": "securepassword"
}
```

---

## Responses

### Success Response
**Status Code:** `200 OK`

**Response Body:**
```json
{
  "token": "jwt_token_here",
  "user": {
    "_id": "user_id_here",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "johndoe@example.com"
  }
}
```

### Error Responses

#### Validation Errors
**Status Code:** `400 Bad Request`

**Response Body:**
```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "Password must be 6 characters long",
      "param": "password",
      "location": "body"
    }
  ]
}
```

#### Server Error
**Status Code:** `500 Internal Server Error`

**Response Body:**
```json
{
  "error": "Server Error"
}
```

---

## Notes
- Ensure that the `JWT_SECRET_KEY` environment variable is set for token generation.
- Passwords are hashed before being stored in the database for security.
- The `email` field must be unique in the database.