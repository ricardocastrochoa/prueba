CREATE DATABASE IF NOT EXISTS prueba;
USE prueba;

CREATE TABLE document_type (
    documentTypeId INT(11) AUTO_INCREMENT PRIMARY KEY,
    documentTypeName VARCHAR(20) NOT NULL UNIQUE
);

CREATE TABLE person (
    personId INT(11) AUTO_INCREMENT PRIMARY KEY,
    personName VARCHAR(20) NOT NULL,
    personLast_name VARCHAR(20) NOT NULL,
    personNumber VARCHAR(10) NOT NULL,
    documentTypeFk INT(11) NOT NULL,
    FOREIGN KEY (documentTypeFk) REFERENCES document_type(documentTypeId)
    FOREIGN KEY (statusId) REFERENCES person_status(statusId)
);
CREATE TABLE person_status (
    statusId INT(11) AUTO_INCREMENT PRIMARY KEY,
    status VARCHAR(50) NOT NULL,
    description VARCHAR(50) NOT NULL
);

