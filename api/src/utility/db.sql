CREATE TABLE IF NOT EXISTS
    users(
      id SERIAL PRIMARY KEY,
      username VARCHAR(128) NOT NULL,
      password VARCHAR(128) NOT NULL,
      role VARCHAR(128) NOT NULL
    );

CREATE TABLE IF NOT EXISTS
  products(
    id SERIAL PRIMARY KEY,
    productName VARCHAR(128) NOT NULL,
    price INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    productImage VARCHAR(128) NOT NULL
  );

CREATE TABLE IF NOT EXISTS
  sales(
    id SERIAL PRIMARY KEY,
    productid INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    amount INTEGER NOT NULL,
    userid INTEGER NOT NULL,
    FOREIGN KEY (userId) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (productId) REFERENCES products (id) ON DELETE CASCADE
  );

  INSERT INTO users(username,password,role) VALUES ('admin', '$2b$10$l7A2ezWuxldzri4fMiwDbeJGNNQqf5aaWlMUV4mGlmezRrHg0Y/ZG', 'superadmin');