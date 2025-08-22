# shopzen.github.io

ShopZen - Full-Stack E-Commerce Platform

A complete, modern, and responsive e-commerce website built from the ground up with a React frontend and a Node.js/Express backend. This project features user authentication, a dynamic product catalog, a persistent shopping cart, order history, and more, all connected to a MongoDB database.

✨ Features
Dynamic Product Catalog: Products are fetched from the FakeStore API and displayed beautifully.

Search & Filtering: Users can search for products by name and filter them by category.

User Authentication: Secure sign-up and sign-in functionality using JWT (JSON Web Tokens).

Persistent Shopping Cart: The user's cart is saved to their account and persists across sessions and devices.

Full Cart Functionality: Add, update quantity, and remove items from the cart.

Order History: Logged-in users can view a history of their past orders.

Product Sharing: Easily share products using the Web Share API or by copying a link.

Responsive Design: A mobile-first design that looks great on any device, from phones to desktops.

🛠️ Tech Stack
Frontend
React: A JavaScript library for building user interfaces.

React Hooks (useState, useEffect): For state management and side effects.

Tailwind CSS: A utility-first CSS framework for rapid UI development.

Fetch API: For making requests to the backend server.

Backend
Node.js: A JavaScript runtime for the server.

Express: A fast, unopinionated, minimalist web framework for Node.js.

MongoDB: A NoSQL database for storing user data, carts, and orders.

Mongoose: An elegant MongoDB object modeling tool for Node.js.

JSON Web Tokens (JWT): For secure user authentication.

bcryptjs: For hashing user passwords before storing them.

CORS: For enabling cross-origin requests between the frontend and backend.

🚀 Getting Started
To get a local copy up and running, follow these simple steps.

Prerequisites
Make sure you have the following installed on your machine:

Node.js (which includes npm)

MongoDB Atlas account (or a local MongoDB instance)

1. Backend Setup
First, set up and run the backend server.

# Clone the repository
git clone https://github.com/your-username/your-repo-name.git

# Navigate to the backend folder
cd your-repo-name/ecommerce-backend

# Install NPM packages
npm install

# Create a .env file in the backend folder and add your variables
touch .env

Your .env file should contain the following:

MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_super_secret_jwt_key>

Replace <your_mongodb_connection_string> with your actual connection string from MongoDB Atlas.

Replace <your_super_secret_jwt_key> with a long, random, and secret string.

Now, start the server:

# Run the server
node server.js

# The server should now be running on http://localhost:5000

2. Frontend Setup
Next, set up and run the React frontend.

# Navigate to the frontend folder from the root directory
cd ../ecommerce-frontend

# Install NPM packages
npm install

# Start the React development server
npm start

# The application should now be running on http://localhost:3000

Your e-commerce website is now running locally!

📝 API Endpoints
The backend server provides the following RESTful API endpoints:

POST /api/signup: Create a new user account.

POST /api/login: Log in a user and receive a JWT.

GET /api/cart: Fetch the current user's cart (Protected).

POST /api/cart/add: Add a product to the cart (Protected).

POST /api/cart/update: Update the quantity of an item in the cart (Protected).

POST /api/cart/remove: Remove an item from the cart (Protected).

GET /api/orders: Fetch the current user's order history (Protected).

POST /api/orders: Create a new order from the user's cart (Protected).

🌟 Future Improvements
Admin Dashboard: A separate interface for managing products, users, and orders.

Payment Gateway Integration: Integrate Stripe or PayPal to handle real transactions.

Product Reviews: Allow users to leave reviews and ratings on products.

Password Reset: Implement a "forgot password" feature using email.
