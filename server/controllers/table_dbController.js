const {pool} = require('./dbConnection.js');

// NOT DONE
const createTable = (request, response) => {
    const { session } = request.body;
    pool.query('', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

// NOT DONE
const deleteTable = (request, response) => {
    const { session } = request.body;
    pool.query('', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}
// NOT DONE
const getTables = (request, response) => {
    // Get tables from db.
    // 1.First check if user is authenticated and get user ID from supabase
    // 2. Get user tenant_id from db
    // 3. Get all tables from db absed on tenant_id
    const { session } = request.body;
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

// NOT DONE
const saveTables = (request, response) => {
    const { session } = request.body;
    pool.query('', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

// NOT DONE
const createFloor = (request, response) => {
    const { session } = request.body;
    pool.query('', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

// NOT DONE
const deleteFloor = (request, response) => {
    const { session } = request.body;
    pool.query('', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

// NOT DONE
const getFloors = (request, response) => {
    const { session } = request.body;
    pool.query('', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

module.exports = {createTable,deleteTable,getTables,saveTables,createFloor,deleteFloor,getFloors}