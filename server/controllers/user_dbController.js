const {pool} = require('./dbConnection.js');

const createUser = (request, response) => {
    pool.query('INSERT INTO users', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}


module.exports = {createUser, getUsers}