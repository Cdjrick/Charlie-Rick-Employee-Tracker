function showAllEmployees() {
    //Show all candidates
    db.query('SELECT * FROM employees', (err, rows) => {
        console.log(rows)
    })
}

function showSpecificEmployee() {
    //Show specific candidate
    db.query(`SELECT * FROM employees WHERE id = ?`, (err, row) => {
        if (err) {
        console.log(err);
        }
        console.log(row);
    });
}

// //Delete a candidate
// db.query(`DELETE FROM candidates WHERE id = ?`, 1, (err, result) => {
//     if (err) {
//       console.log(err);
//     }
//     console.log(result);
//   });

function createEmployee() {
    //Create a candidate
    const sql = `INSERT INTO employees (id, first_name, last_name, role_id, manager_id) 
                VALUES (?,?,?,?)`;
    // const params = [1, 'Ronald', 'Firbank', 1];

    db.query(sql, params, (err, result) => {
    if (err) {
        console.log(err);
    }
    console.log(result);
    });
}

module.exports = dbMethods