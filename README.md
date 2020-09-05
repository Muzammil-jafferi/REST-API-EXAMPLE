# REST-API-EXAMPLE

#To start the application:

1. git clone https://github.com/Muzammil-jafferi/REST-API-EXAMPLE.git
2. npm install
3. npm run local

Now, You can hit the APIs using postman.

#Schema -->
Category - {\_id,name,child_category}
Products - {\_id,name,price,category_name}

#API CALLS

1. Add category -- adding category details
   a) url -> http://localhost:5000/add-category
   b) body -> {
   "name":"Category 1",
   "child_category":["ABC","DEF"]
   }

2. Add product -- adding product details
   a) url -> http://localhost:5000/add-product
   b) body -> {
   "name":"Product 1",
   "price":200,
   "category_name":["Category 1"]
   }

3. Get all category -- list all the categories
   a) url -> http://localhost:5000/categories
4. Get products by category -- list all product based on category name
   a) url -> http://localhost:5000/product-by-category
   b) body -> {
   "category":"Category 3"
   }

5. Update product -- updating product price and category based on productname
   a) url -> http://localhost:5000/update-product
   b) body -> {
   "name":"Product 1",
   "price":500,
   "category_name":["Category 1"]
   }
