# WTWR (What to Wear?): Back End
WTWR is a web application designed to help users decide what to wear based on the current weather. Users can create, view, update, and delete clothing items in their virtual wardrobe, which can be categorized based on weather conditions (hot, warm, cold). The application also supports user authentication and profile management.

## Features
- User Authentication: Secure user registration and login functionality using JWT (jsonwebtoken).
- Password Hashing: Passwords are securely hashed using bcrypt.
- Profile Management: Users can view and update their profile information.
- Clothing Items:
  - Add new clothing items with details such as name, weather type, and image URL.
  - View a list of all clothing items.
  - Update existing clothing items.
  - Delete clothing items.
- Weather-based Categorization: Clothing items can be categorized based on weather conditions (hot, warm, cold).
- Likes: Users can like or dislike clothing items.
- Error Handling: Proper error messages and status codes for invalid requests or server errors.


## Technologies Used
### - Backend:
  - Node.js
  - Express.js
  - Mongoose (MongoDB)
### - Tools:
  - Postman (for API testing)
  - MongoDB Atlas (for database hosting)

## API Endpoints
### Auth Routes
- `POST /signup` : Registers a new user
- `POST /signin` : Authenticates a user and returns a JWT token

### User Routes
- 'GET /users/me' : Returns current user 
- 'PATCH /users/me' : Update current user

### Clothing Item Routes
- 'GET /items' : Returns all clothing items
- 'POST /items' : Creates a new clothing item
- 'PUT /items/:id' : Updates an existing clothing item
- 'DELETE /items/:id' : Deletes a clothing item by _id

### Like/Dislike Routes
- 'PUT /items/:id/likes' : Likes a clothing item
- 'DELETE /items/:id/likes' : Dislikes a clothing item

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/NeysonAdams/se_project_express.git
   cd wtwr-backend
   ```

2. Install dependencies:
```bash
   npm install
   ```

3. Start the server:
```bash
   npm start
```

## Usage
1. Use Postman or any other API testing tool to interact with the API.
2. Register a new user via POST /signup.
3. Authenticate the user via POST /signin to receive a JWT token.
4. Use the JWT token in the Authorization header to access protected routes.

## Links
 - [Front End](https://www.ttnewwtwr.jumpingcrab.com)
 - [Back End](https://api.ttnewwtwr.jumpingcrab.com/)
