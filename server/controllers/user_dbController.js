const {pool} = require('./dbConnection.js');

const createUser = (id, email_input) => {
    pool.query(`INSERT INTO users (id,email) VALUES('${id}', '${email_input}')`, (error, results) => {
        if (error) {
            throw error
        }
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