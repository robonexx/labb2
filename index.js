// this wasent the easiest way to do this, but I got it to work and It took a while.
// But its working! Tried out browser, postman and checked db in xampp phpMyAdmin 
// http://localhost/phpmyadmin/index.php?route=/sql&server=1&db=beerdb&table=beers&pos=0

const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const { urlencoded } = require('body-parser')

const app = express()
const port = process.env.PORT || 5000

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

// setting up mySQL, trying out thread pool system, read documentation
// https://dev.mysql.com/doc/refman/8.0/en/faqs-thread-pool.html

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'beerdb'
})

// get all items
// get all items works
app.get('/beers', (req, res) => {

    // creating the connection to the pool 
    pool.getConnection((err, connection) => {
        if (err)
            throw err
        console.log(`conneced as id ${connection.threadId}`)

        // query method sqlString and callback
        connection.query('SELECT * FROM beers', (err, rows) => {
            connection.release()

            if (err) {
                console.log(err)
            } else {
                res.send(rows)
            }
        })

    })
})


// get item by id 
// get a item by id works
app.get('/beers/:id', (req, res) => {

    // creating the connection to the pool 
    pool.getConnection((err, connection) => {
        if (err)
            throw err
        console.log(`conneced as id ${connection.threadId}`)

        // query method sqlString and callback
        connection.query('SELECT * FROM beers WHERE id = ?', [req.params.id], (err, rows) => {
            connection.release()

            if (err) {
                console.log(err)
            } else {
                res.send(rows)
            }
        })

    })
})


// create item / add beer
app.post('/beers/create', (req, res) => {

    // creating the connection to the pool 
    pool.getConnection((err, connection) => {
        if (err)
            throw err
        console.log(`conneced as id ${connection.threadId}`)

        // here we use the body parser
        const params = req.body

        // query method sqlString and callback
        connection.query('INSERT INTO beers SET ?',params , (err, rows) => {
            connection.release()

            if (err) {
                console.log(err)
            } else {
                res.send(`New item/beer name: ${[params.name]}, successfully added. `)
            }
        })
        console.log(req.body)
    })
})

// Update item/ beer 

app.put('/beers/update', (req, res) => {

    // creating the connection to the pool 
    pool.getConnection((err, connection) => {
        if (err)
            throw err
        console.log(`conneced as id ${connection.threadId}`)

        // here we use destructuring
                const {id, name, tagline, description, image} = req.body

        // query method sqlString and callback
        connection.query(`UPDATE beers SET name = ?, tagline = ?, description = ?, image = ? WHERE id = ?`, [name, tagline, description, image, id], (err, rows) => {
            connection.release()

            if (!err) {
                res.send(`Your item by name: ${name} has been successfully updated`)
            } else {
                console.log(err)
            }
        })
        console.log(req.body)
    })
})

// delete item
// delete works
app.delete('/beers/delete/:id', (req, res) => {

    // creating the connection to the pool 
    pool.getConnection((err, connection) => {
        if (err)
            throw err
        console.log(`conneced as id ${connection.threadId}`)

        // query method sqlString and callback
        connection.query('DELETE FROM beers WHERE id = ?', [req.params.id], (err, rows) => {
            connection.release()

            if (err) {
                console.log(err)
            } else {
                res.send(`selected item by id: ${[req.params.id]} deleted `)
            }
        })

    })
})




// listening to port
app.listen(port, () => console.log(`listening to port ${port}`))


/* 
copy from sql database 
CREATE TABLE `beerdb`.`beers` ( `id` BIGINT NOT NULL AUTO_INCREMENT , `name` VARCHAR(255) NOT NULL , `tagline` VARCHAR(255) NOT NULL , `description` TEXT NOT NULL , `image` VARCHAR(50) NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;
*/