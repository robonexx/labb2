// källor för min inlärning
// https://www.youtube.com/watch?v=YYEC7ydDj4k
// kurs på udemy The complete node.js developer course
//
// labb 2 VG step one understanding the basics 
// how to create a db via browser or post man also how to add table and then add "items" to table

const express = require('express')
app = express()

const mysql = require('mysql');
const bodyParser = require('body-parser');

// create connection to database

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    // write name of database here when creating a table
    /* database: 'theconnexion' */
    database: 'theconnexion'

});

// connect to mysql

db.connect(err => {
    if (err) {
        throw err;
    }
    console.log('mysql connected');
});



// create database, localhost:3000/createdb creates a new database

app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE theconnexion';
    db.query(sql, err => {
        if (err) {
            throw err;
        }
        res.send('database was created succesfully')
    });
});

// create table inside db i decided to do a db of dancers
app.get('/createdancer', (req, res) => {
    let sql = 'CREATE TABLE dancer(id int AUTO_INCREMENT, name VARCHAR(255), designation VARCHAR(255), PRIMARY KEY(id))'
    db.query(sql, err => {
        if (err) {
            throw err
        }
        res.send('dancer table was created')
    })
})

// add a dancer to the table of dancers

app.get('/dancer3', (req, res) => {
    let post = {name: 'Will da bill', designation: 'Ragga king 2006'}
    let sql = 'INSERT INTO dancer SET ?'
    let query = db.query(sql, post, err => {
        if (err) {
            throw err
        }
        res.send('dancer was added')
    })
    
})
app.get('/dancer4', (req, res) => {
    let post = {name: 'Mannys butt', designation: 'OG chippendale ala pew pew'}
    let sql = 'INSERT INTO dancer SET ?'
    let query = db.query(sql, post, err => {
        if (err) {
            throw err
        }
        res.send('dancer was added')
    })
    
})

app.get('/getdancer', (req, res) => {
    let sql = 'SELECT * FROM dancer'
    let query = db.query(sql, (err, results) => {
        if (err) {
            throw err
        }
        console.log(results)
        res.send('Empolyee details fetched')
    })
})


// update dancer thru id params "endpoint"
app.get('/updatedancer/:id', (req, res) => {
    // here you add what you wanna update about the dancer

    let newName = 'New comer'
    let newDesignation = 'the force is stroooong'
    let sql = `UPDATE dancer SET name = '${newName}', designation = '${newDesignation}'WHERE id = ${req.params.id}`
    let query = db.query(sql, err => {
        if (err) {
            throw err
        }
        res.send('dancer name updated')
    })
})

// delete dancer
app.get('/deletedancer/:id', (req, res) => {
    let sql = `DELETE FROM dancer WHERE id = ${req.params.id}`
    let query = db.query(sql, err => {
        if (err) {
            throw err
        }
        res.send('dancer deleted')
    })
})

//listen on port 3000
app.listen('3000', () => console.log(`Server started on port 3000`))
