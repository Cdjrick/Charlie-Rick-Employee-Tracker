const express = require('express')
const db = require('./db/connection')
const inquirer = require('inquirer')

const questions = [
    question1 = {
        name: 'question1',
        message: 'What would you like to do?',
        type: 'list',
        choices: [{key: 'a', value: 'View all employees'}, {key: 'b', value: 'View all employees by department'}, {key: 'c', value: 'View all employees by manager'}, 
        {key: 'd', value: 'Add an employee'}]
    }
]

function inquire() {
    return inquirer.prompt(question1)
    .then((data) => {
        console.log(data)
        if(data === 'View all employees') {
            console.log('Done')
            // Show all candidates
            db.query('SELECT * FROM employee, roleTable, department', (err, rows) => {
            // console.table([
            //     {
            //       id: 'foo',
            //       age: 10
            //     }, {
            //       name: 'bar',
            //       age: 20
            //     }
            //   ]);

            console.log(rows)
            return
            })
        } 
    })
}

db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    inquire()
  });

