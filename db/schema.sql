CREATE TABLE employee (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INTEGER REFERENCES roleTable(id)
);

CREATE TABLE roleTable (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INTEGER REFERENCES department(id)
);

CREATE TABLE department (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    department VARCHAR(30)
);