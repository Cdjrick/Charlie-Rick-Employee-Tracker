const express = require('express')
const mysql = require('mysql2')
const dbMethods = require('./assets/dbMethods')

const PORT = process.env.PORT || 3001
const app = express()

// Express middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // Your MySQL username,
      user: 'root',
      // Your MySQL password
      password: 'midnight',
      database: 'election'
    },
    console.log('Connected to the election database.')
);

app.use((req, res) => {
    res.status(404).end()
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})
