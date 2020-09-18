use employees_DB;

INSERT INTO department
    (name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Legal'),
    ('Human Resources');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Sales Manager', 100000, 1),
    ('Sales Representative', 100000, 1),
    ('Software Developer', 130000, 2),
    ('Database Administrator', 100000, 2),
    ('Legal Analyst', 75000, 3),
    ('Lead Counsel', 225000, 3),
    ('HR Operations Specialist', 70000, 4),
    ('Employee Relations Manager', 150000, 4);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Talia', 'Vazquez', 3, NULL),
    ('Carl', 'Brown', 2, NULL),
    ('Joyce', 'Kwon', 1, NULL),
    ('Travis', 'Johnson', 4, NULL),
    ('Samantha', 'Smith', 5, NULL),
    ('Lawrese', 'Ford', 6, NULL),
    ('Ope', 'Adigun', 7, NULL),
    ('Simi', 'Singh', 7, NULL);


    