CREATE USER happy_user WITH PASSWORD 'password';

CREATE DATABASE articles_products WITH OWNER happy_user;

CREATE TABLE products (
  id SERIAL PRIMARY KEY NOT NULL,
  name varchar(100) NOT NULL,
  price DECIMAL(8, 2) NOT NULL,
  inventory INTEGER NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

--Temp data
INSERT INTO products (name, price, inventory)
VALUEs ('chocolate', 10.25, 3);

CREATE TABLE articles (
  title varchar(255) NOT NULL,
  body text NOT NULL,
  author varchar(100) NOT NULL,
  urltitle varchar(500) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

--Temp data
INSERT INTO articles (title, body, author, urltitle)
VALUEs ('The Last Lecture', 'Follow your childhood dream ...', 'Randy Pausch', 'The%20Last%20Lecture');