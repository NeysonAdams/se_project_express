# WTWR (What to Wear?): Back End
WTWR is a web application designed to help users decide what to wear based on the current weather. Users can create, view, update, and delete clothing items in their virtual wardrobe, which can be categorized based on weather conditions (hot, warm, cold). The application also supports user authentication and profile management.

## Features
- User Authentication: Secure user registration and login functionality.
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
###- Backend:
  - Node.js
  - Express.js
  - Mongoose (MongoDB)
###- Tools:
  - Postman (for API testing)
  - MongoDB Atlas (for database hosting)

## API Endpoints
### User Routes
- 'GET /users' : Returns all users
- 'GET /users/:userId' : Returns a user by _id
- 'POST /users' : Creates a new user
### Clothing Item Routes
- 'GET /items' : Returns all clothing items
- 'POST /items' : Creates a new clothing item
- 'PUT /items/:id' : Updates an existing clothing item
- 'DELETE /items/:id' : Deletes a clothing item by _id
### Like/Dislike Routes
- 'PUT /items/:id/likes' : Likes a clothing item
- 'DELETE /items/:id/likes' : Dislikes a clothing item

### Testing
Before committing your code, make sure you edit the file `sprint.txt` in the root folder. The file `sprint.txt` should contain the number of the sprint you're currently working on. For ex. 12
