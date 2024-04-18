# 🛒 Shop API

**API for a shop built in the Nest framework**

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
  - proce_to
  - categoryId - products' category
- GET /products/:id - getting specific product
- PATCH /products/:id - updating specific product
- DELETE /products/:id - deleting specific product
