create table IF NOT EXISTS User(
    username varchar(100),
    password varchar(100),
    roles varchar(100),
    PRIMARY KEY(username)
);


CREATE TABLE IF NOT EXISTS Patient (
    Id BIGINT AUTO_INCREMENT PRIMARY KEY,
    abhaNumber VARCHAR(100),
    abha_address VARCHAR(255),
    name VARCHAR(255),
    gender VARCHAR(10),
    yearOfBirth VARCHAR(4),
    monthOfBirth VARCHAR(2),
    dayOfBirth VARCHAR(2),
    mobile VARCHAR(20),
    district VARCHAR(100),
    state VARCHAR(100)
);
