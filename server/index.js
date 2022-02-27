require('dotenv').config() 
const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')
const PORT = 3001

app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
})

app.post('/addpassword', (req, res) => {
    const { password, title } = req.body

    db.query('INSERT INTO passwords (password, title) VALUES (?,?)', [
        password, 
        title
    ], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send('Success')
        }
    })
})

app.listen(PORT, () => {
    console.log('Server is running')
})