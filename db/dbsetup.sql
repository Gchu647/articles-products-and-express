CREATE USER happy_user WITH PASSWORD 'password';

CREATE DATABASE articles_products WITH OWNER happy_user;

CREATE TABLE products (
  id SERIAL PRIMARY KEY NOT NULL,
  name varchar(100) NOT NULL,
  price DECIMAL(8, 2) NOT NULL,
  inventory INTEGER NOT NULL
);

--Temp data
INSERT INTO products (name, price, inventory)
VALUEs ('chocolate', 10.25, 3);