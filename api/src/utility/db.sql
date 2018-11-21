CREATE TABLE IF NOT EXISTS
    users(
      userid SERIAL PRIMARY KEY,
      username VARCHAR(128) NOT NULL,
      password VARCHAR(250) NOT NULL,
      role VARCHAR(30) NOT NULL
    );

CREATE TABLE IF NOT EXISTS
  products(
    productid SERIAL PRIMARY KEY,
    productName VARCHAR(250) NOT NULL,
    price NUMERIC NOT NULL,
    quantity INTEGER NOT NULL,
    mininventoryqty INTEGER NOT NULL,
    productImage VARCHAR(200) NOT NULL
  );

CREATE TABLE IF NOT EXISTS
  sales(
    salesid SERIAL PRIMARY KEY,
    productid INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    amount NUMERIC NOT NULL,
    userid INTEGER NOT NULL,
    salesdate TIMESTAMPTZ DEFAULT Now(),
    FOREIGN KEY (userId) REFERENCES users (userid) ON DELETE CASCADE,
    FOREIGN KEY (productId) REFERENCES products (productid) ON DELETE CASCADE
  );

  INSERT INTO users(username,password,role) VALUES ('admin', '$2b$10$l7A2ezWuxldzri4fMiwDbeJGNNQqf5aaWlMUV4mGlmezRrHg0Y/ZG', 'superadmin');