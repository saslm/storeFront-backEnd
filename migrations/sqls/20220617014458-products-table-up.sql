CREATE TABLE products (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR NOT NULL, 
    "price" NUMERIC(17,2)  NOT NULL, 
    "category" VARCHAR
);