## API Endpoints

#### Products
- Index - HTTP verb get - Endpoint: /products
	Request body - N/A
	Response body - Array of Products: [{id, name, price, category}]
- Show - HTTP verb get - Endpoint: /products/:id
	Request body - product id
	Response body - single product object {id, name, price, category}
- Create [token required] - HTTP verb post - Endpoint: /products
	Request body - new product object - {name, price, category}
	Response Body - returns created product - {id, name, price, category}
- Edit [token required] - HTTP verb patch - Endpoint: /products/:id
	Request body - edited product object - {id, name, price, category}
	Response body - edited product object - {id, name, price, category}
- Delete [token required] - HTTP verb delete - Endpoint: /products
	Request body - id of product to be deleted - {id}
	Response body - deleted product object - {id, name, price, category}


#### Users
- Index [token required] - HTTP verb get - Endpoint: /users
	Request body - N/A
	Response body - Array of user objects - {id, userName, firstName, lastName, password(hash)}
- Show [token required] - HTTP verb get - Endpoint: /users/:id
	Request body - id of user to show - {id}
	Response body - User object - {id, userName, firstName, lastName, password(hash)}
- Create [token required] - HTTP verb post - Endpoint: /users
	Request body - user object - {userName, firstName, lastName, password}
	Response body - created user object - {userName, firstName, lastName, password(hash)}
- Edit [token required] - HTTP verb patch - Endpoint: /users/:id
	Request body - user object - {userName, firstName, lastName, password}
	Response body - edited user object - {userName, firstName, lastName, password(hash)}
- Delete [token required] - HTTP verb delete - Endpoint: /users
	Request body - id of user to be deleted - {id}
	Response body - deleted user object - {userName, firstName, lastName, password(hash)}
- Authenticate - HTTP verb post - Endpoint: /users/authenticate
	Request body - username and password of user to authenticat - {userName, Password}
	Response body - JWT token

#### Orders
- Current Order by user (args: user id)[token required] - HTTP verb get - Endpoint: /orders/current/:id
	Request body - User id - {id}
	Response body - Array of orders for the selected user with a completion status of false - [{id, username, products[{name, price, quantity,product_id}], complete}] 
- Index [token required] - HTTP verb get - Endpoint: /orders
	Request body - N/A
	Response body - Array of order objects, including an array of products added to the order and the associated userName - [{id, username, products[{name, price, quantity,product_id}], complete}]
- Show [token required] - HTTP verb get - Endpoint: /orders/:id
	Request body - id of order to show - {id}
	Response body - Order object, including an array of products added to the order and the associated userName - {id, username, products[{name, price, quantity,product_id}], complete}
- Create [token required] - HTTP verb post - Endpoint: /orders
	Request body - order object - {user_id,  complete}
	Response body - created order object - {id, user_id, complete}
- Edit [token required] - HTTP verb patch - Endpoint: /orders/:id
	Request body - order object - {id, user_id,  complete}
	Response body - edited order object - {id, user_id, complete}
- Delete [token required] - HTTP verb delete - Endpoint: /users
	Request body - id of order to be deleted - {id}
	Response body - deleted order object - {id, user_id, complete}
Index 
  * Method           -  GET
  * Authorization required    - Bearer <token>
  * Parameters        - none
  * Usage             - list all orders
  * http://localhost:3000/orders

- Show 
  * Method           -  GET
  * Authorization required    - Bearer <token>
  * Parameters        - id
  * Usage             - list a specific order
  * http://localhost:3000/order/:id
 

- Create
  * Method           -  POST
  * Authorization required    - Bearer <token>
  * Parameters        - status, userId
  * Usage             -  create a new order
  * http://localhost:3000/order


- Update
  * Method           -  PUT
  * Authorization required    - Bearer <token>
  * Parameters        -  id, status
  * Usage             -  edit an exciting order
  * http://localhost:3000/order

- Delete
  * Method           -  DELETE
  * Authorization required    - Bearer <token>
  * Parameters        -  id
  * Usage             -  Delete an exciting order
  * http://localhost:3000/order

- addProduct
  * Method           -  POST
  * Authorization required    - Bearer <token>
  * Parameters        -  orderId, productId, quantity
  * Usage             - Add products to an existing order
  * http://localhost:3000/orders/:id/products
  


## Database schema
#### Products table
- id - serial primary key 
- name - varchar - Cannot be null
- price - numeric(17,2) - Cannot be null
- category - varchar

#### Users table
- id - serial primary key
- userName - varchar unique - Cannot be null
- firstName - varchar - Cannot be null
- lastName - varchar - Cannot be null
- password - varchar  - Cannot be null

#### Orders table
- id - serial primary key
-  status  VARCHAR(20) 
- user_id INT REFERENCES users(id)   - Cannot be null


#### Order_Products table
- id - serial primary key
- order_id - bigint references orders(id)  - Cannot be null
- product_id - bigint references products(id)  - Cannot be null
- quantity - INT  - Cannot be null

