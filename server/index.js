require('dotenv').config() 
const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')
const PORT = 3001

const { encrypt, decrypt } = require('./EncryptionHandler')

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
    const hashedPassword = encrypt(password)

    db.query('INSERT INTO passwords (password, title, iv) VALUES (?,?,?)', [
        hashedPassword.password, 
        title,
        hashedPassword.iv
    ], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send('Success')
        }
    })
})

app.get('/showpasswords', (req, res) => {
    db.query('SELECT * FROM passwords', (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})

app.post('/decryptpassword', (req, res) => {
    res.send(decrypt(req.body))
})

app.listen(PORT, () => {
    console.log('Server is running')
})