# 🛒 Shop API

**API for a shop built in the Nest.js framework**

<br>

## 📍 Endpoints


### Auth

Users module, where RolesGuars and getUser decorator are declared.

- POST /auth/signup - signing up
- POST /auth/signin - signing in, returns accessToken

<br>

### Addresses

Address module, that has an assigned user so that the user can have multiple addresses.

- POST /addresses - creating address
- GET /addresses - getting all users' addresses
- PATCH /addresses/:id - updating specific address
- DELETE /addresses/:id - deleting specific address

<br>

### Categories

Products' categories module.

- POST /categories - creating category
- GET /categories - getting all categories
- PATCH /categories/:id - updating category
- DELETE /categories/:id - deleting category

<br>

### Products

Module with products to sell in the shop.

- POST /products/create - creating product
- GET /products/ - getting products with filters:
  - search - text to search by name and description
  - price_from
  - price_to
  - categoryId - products' category
- GET /products/:id - getting specific product
- PATCH /products/:id - updating specific product
- DELETE /products/:id - deleting specific product

<br>

### Cart

Cart module, where products in users' carts are managed.

- POST /cart - adding product to cart
- GET /cart - getting users' products in the cart
- PATCH /cart/:id - changing the quantity of one product in the cart
- DELETE /cart/:id - deleting a product from the cart

<br>

### Orders

Module for creating and managing orders.

- POST /orders/order-details - returning order details, in request body list of carts' IDs is sent
- POST /orders/create-order - creating order
- GET /orders/my-orders - getting all users' orders
- GET /orders/my-order/:id - getting specific users' order
- GET /orders/admin - getting all orders
- GET /orders/admin/:id - getting specific order
- PATCH /orders/admin/:id - changing order status (in progress, sent, finished)

<br>

## 💻 Used technologies

API:
- Nest.js framework
- TypeScript

Database:
- PostgreSQL
- PgAdmin

DevOps tool:
- Docker

API testing tool:
- Postman


<br>

## 😎 What have I learned?

This is the first Nest.js API application that I've developed independently. I've been developing my skills in this framework during this project, and I've become more familiar with it.
