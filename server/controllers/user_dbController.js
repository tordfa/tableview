const { pool } = require('./dbConnection.js');

const createUser = async (id, email_input) => {
    try {
        let result = await pool.query(`INSERT INTO users (id,email) VALUES('${id}', '${email_input}')`)
        return { success: true, result };
    } catch (error) {
        console.log("There was an error inserting user" + error);
    }
}

const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}


module.exports = { createUser, getUsers }