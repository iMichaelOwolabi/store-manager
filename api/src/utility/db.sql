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
    price VARCHAR(128) NOT NULL,
    quantity VARCHAR(128) NOT NULL,
    productImage VARCHAR(128) NOT NULL
  );

  INSERT INTO users(username,password,role) VALUES ('admin', '$2b$10$l7A2ezWuxldzri4fMiwDbeJGNNQqf5aaWlMUV4mGlmezRrHg0Y/ZG', 'superadmin');