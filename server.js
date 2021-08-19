const db = require('./db/connection')
const inquirer = require('inquirer')

const menu = {
    name: 'Question 1',
    message: 'What would you like to do?',
    type: 'list',
    choices: ['View all departments', 'View all roles','View all employees', 'View all employees by department',
    'View all employees by manager', 'Add an employee', 'Add a department', 'Add a role', 'Update an employee role']
}

function viewAllEmployees() {
    return db.promise().query(`
            SELECT 
                employees.id,
                first_name,
                last_name,
                roles.title AS title,
                departments.department,
                roles.salary
            FROM employees
            LEFT JOIN roles ON employees.role_id = roles.id
            LEFT JOIN departments ON roles.department_id = departments.id
    `).then( ([rows]) => {
        console.table(rows) 
    }).catch((err) => {
        console.log(err)
    })
}

function viewAllDepartments() {
    return db.promise().query(`
    SELECT * FROM departments
    `).then( ([rows]) => {
        console.table(rows)
    }).catch((err) => {
        console.log(err)
    })
}

function viewAllRoles() {
    return db.promise().query(`
            SELECT title, 
            employees.role_id, 
            departments.department, 
            salary 
            FROM roles 
            LEFT JOIN employees ON roles.department_id = employees.id 
            LEFT JOIN departments ON roles.department_id = departments.id
    `).then(([rows]) => {
        console.table(rows)
    }).catch((err) => {
        console.log(err)
    })
}

function addDepartment() {

    const addADepartment = {
        name: 'department',
        message: 'Enter the Department Name',
        type: 'input'
    }

    return inquirer.prompt(addADepartment)
    .then((data) => {
        const sql = `
                    INSERT INTO departments (department)
                    VALUES (?)
        `
        return db.promise().query(sql, data.department)
        .then(() => {
            console.log('Department Added')
        })
    }).catch((err) => {
        console.log(err)
    })
}

function addRole() {
    let sql = `SELECT department, id FROM departments`
    return db.promise().query(sql)
    .then(([departments]) => {
        let departmentList = []
        departments.forEach((department) => {
            departmentList.push(`${department.department}`)  
        })

        const addARole = [
            {
                name: 'title',
                message: 'Enter Name of the role',
                type: 'input'
            },
            {
                name: 'salary',
                message: 'Enter Salary Amount',
                type: 'input'
            },
            {
                name: 'department',
                message: 'Enter Department Id',
                type: 'list',
                choices: departmentList
            }
        ]
    
        return inquirer.prompt(addARole)
        .then((data) => {
            let chosenDepartment
            departments.forEach((department) => {
                if(data.department === department.department) {
                    chosenDepartment = department.id
                }
            })

            const sql = `
                        INSERT INTO roles (title, salary, department_id)
                        VALUES (?,?,?)
            `
            return db.promise().query(sql, [data.title, data.salary, chosenDepartment])
            .then(() => {
                console.log('Role Added')
            })
        })
    }).catch((err) => {
        console.log(err)
    })
}

function addEmployee() {

    let sql = `SELECT title, id FROM roles`
    return db.promise().query(sql)
    .then(([roles]) => {
        let employeeRoles = []
        roles.forEach((role) => {
            employeeRoles.push(`${role.title}`)  
        })

        const addAnEmployee = [
            {
                name: 'firstName',
                message: 'Enter employee first name',
                type: 'input'
            },
            {
                name: 'lastName',
                message: 'Enter employee last name',
                type: 'input'
            },
            {
                name: 'role',
                message: 'Enter employee role',
                type: 'list',
                choices: employeeRoles
            }
        ]

        
    
        return inquirer.prompt(addAnEmployee)
        .then((data) => {
            let title
            roles.forEach((role) => {
                if(data.role === role.title) {
                    title = role.id
                }
            })

            const sql = `
                        INSERT INTO employees (first_name, last_name, role_id)
                        VALUES (?,?,?)
            `
            return db.promise().query(sql, [data.firstName, data.lastName, title])
            .then(() => {
                console.log('Employee Added')
            })
        })
    }).catch((err) => {
        console.log(err)
    })
}

function updateEmployee() {
    let sql = `SELECT employees.id, first_name, last_name, roles.id AS "role_id"
    FROM employees, roles, departments WHERE departments.id = roles.department_id AND roles.id = employees.role_id`

    return db.promise().query(sql)
    .then(([employees]) => {
        let employeeNames = []
        employees.forEach((employee) => {
            employeeNames.push(`${employee.first_name} ${employee.last_name}`)
        })

        let sql = `SELECT title, id FROM roles`
        return db.promise().query(sql)
        .then(([roles]) => {
            let employeeRoles = []
            roles.forEach((role) => {
                employeeRoles.push(`${role.title}`)  
            })

            const updateEmployeeRole = [
                {
                    name: 'employee',
                    message: 'Which employee would you like to update',
                    type: 'list',
                    choices: employeeNames
                },
                {
                    name: 'role',
                    message: 'Enter new role',
                    type: 'list',
                    choices: employeeRoles
                }
            ]

            return inquirer.prompt(updateEmployeeRole)
            .then((answer) => {
                let newTitle, employeeId

                roles.forEach((role) => {
                    if(answer.role === role.title) {
                        newTitle = role.id
                    }
                })

                employees.forEach((employee) => {
                    if(answer.employee === `${employee.first_name} ${employee.last_name}`) {
                        employeeId = employee.id
                    }
                })
                console.log(newTitle)
                console.log(employeeId)

                let sqls = `UPDATE employees SET employees.role_id = ? WHERE employees.id = ?`
                return db.promise().query(sqls, [newTitle, employeeId])
                .then(console.log('Employee role updated'))
            })
        })   
    }).catch((err) => {
        console.log(err)
    })
}

function handleInquireResponse(data) {
    switch(data[menu.name]) {
        case menu.choices[0]: return viewAllDepartments()
        case menu.choices[1]: return viewAllRoles()
        case menu.choices[2]: return viewAllEmployees()
        case menu.choices[3]: return 
        case menu.choices[4]: return 
        case menu.choices[5]: return addEmployee()
        case menu.choices[6]: return addDepartment()
        case menu.choices[7]: return addRole()
        case menu.choices[8]: return updateEmployee()
    }
}

function inquire() {
    return inquirer.prompt(menu)
    .then((data) => {
        console.clear()
        console.log('\n')
        handleInquireResponse(data)
        .then(() => {
            console.log('\n')
            inquire()
        })
    })
}

db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    viewAllEmployees()
    .then(() => {
        inquire()
    })
});