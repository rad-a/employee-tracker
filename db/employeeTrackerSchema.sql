DROP DATABASE IF EXISTS employees_DB;
CREATE DATABASE employees_DB;

USE employees_DB;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT, 
    `name` VARCHAR (30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT, 
    title VARCHAR (30) NOT NULL,
    salary DECIMAL (10,2) NOT NULL,
    department_id INT NOT NULL, 
    PRIMARY KEY (id),
    CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department (id)
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT, 
    first_name VARCHAR (30) NOT NULL,
    last_name VARCHAR (30) NOT NULL,
    role_id INT NOT NULL, 
    manager_id NULL, 
    PRIMARY KEY (id),
    CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role(id)
    CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employee(id)
);