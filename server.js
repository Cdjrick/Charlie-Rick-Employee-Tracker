const express = require('express')
const db = require('./db/connection')
const inquirer = require('inquirer')
const apiRoutes = require('./routes/apiRoutes');

// const dbMethods = require('./assets/dbMethods')

const PORT = process.env.PORT || 3001
const app = express()

// Express middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Use apiRoutes
app.use('/api', apiRoutes);

// const sqlInsert = `INSERT INTO employee ();

app.use((req, res) => {
    res.status(404).end()
})

db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  });