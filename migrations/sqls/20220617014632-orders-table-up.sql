CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    status VARCHAR(20),
    user_id INT REFERENCES users(id)
);