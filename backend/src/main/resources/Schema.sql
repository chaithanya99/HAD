create table IF NOT EXISTS User(
    username varchar(100),
    password varchar(100),
    roles varchar(100),
    PRIMARY KEY(username)
);

INSERT INTO users (username, password, roles)
VALUES ('admin', '$2a$10$8c6O3zvZrVejyqC8kyvjyuDW3fBtcsdFqxyg6yrggNuGLgYwQF6K', 'ROLE_ADMIN')
ON CONFLICT (username) DO NOTHING;