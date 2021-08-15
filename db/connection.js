const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // Your MySQL username,
    user: 'root',
    // Your MySQL password
    password: 'midnight',
    database: 'employees'
  },
  console.log('Connected to the employees database.')
);

//Show all candidates
// db.query('SELECT * FROM employee, roleTable, department', (err, rows) => {
//   // console.table([
//   //     {
//   //       id: 'foo',
//   //       age: 10
//   //     }, {
//   //       name: 'bar',
//   //       age: 20
//   //     }
//   //   ]);

//   console.log(rows)
// })

module.exports = db;
