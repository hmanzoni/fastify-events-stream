CREATE TABLE users (
    id UUID PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP
);

CREATE TABLE event_logs (
    id UUID PRIMARY KEY,
    event_type VARCHAR(50) NOT NULL,
    user_id UUID REFERENCES users(id),
    timestamp TIMESTAMP,
    metadata JSONB
);

INSERT INTO users VALUES (
    '00000000-0000-0000-0000-000000000000', 
    'no-user', 
    'no-user@undefined.com', 
    '$2b$10$kN7Icw8937Qb5vWKHz6Q3uO2yuBwJomLjjVSWIqnAbGLlQQrqa1n2', 
    CURRENT_TIMESTAMP
);