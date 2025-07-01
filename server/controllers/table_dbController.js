const { pool } = require('./dbConnection.js');
const { getUserId, getTenantIdFromUser } = require('./user_dbController.js')

// NOT DONE
const createTable = async (req, res) => {
    try {
        let user_id = await getUserId(req);
        let tenant_id = await getTenantIdFromUser(user_id);

        const { table_name, table_number, table_seats, floor_id } = req.body;
        let result = await pool.query(
            `INSERT INTO tables (tenant_id, table_name, table_number, table_seats, floor_id) 
        VALUES('${tenant_id}','${table_name}', '${table_number}', '${table_seats}', '${floor_id}') RETURNING id, floor_id`);

        return res.status(200).json({ success: true, result })
    } catch (error) {
        return res.status(401).json({ success: false })
    }
}

// NOT DONE
const deleteTable = async (req, res) => {
    try {
        // 1.First check if user is authenticated and get user ID from supabase
        let user_id = await getUserId(req);
        // 2. Get user tenant_id from db
        let tenant_id = await getTenantIdFromUser(user_id);
        let {table_id} = req.body;
        // 3. DELETE table from db based on table_id and tenant_id
        let result = await pool.query(`DELETE FROM tables WHERE id = '${table_id}' AND tenant_id = '${tenant_id}'`);
        return res.status(200).json({ success: true, result });
    } catch (error) {
        return res.status(401).json({ success: false, error })
    }
}
// NOT DONE
const getTables = async (req, res) => {
    // Get tables from db.
    try {
        // 1.First check if user is authenticated and get user ID from supabase
        let user_id = await getUserId(req);
        // 2. Get user tenant_id from db
        let tenant_id = await getTenantIdFromUser(user_id);
        // 3. Get all tables from db based on tenant_id
        let result = await pool.query(`SELECT * FROM tables WHERE tenant_id = '${tenant_id}'`);
        return res.status(200).json({ success: true, tables: result.rows });

    } catch (error) {
        return res.status(401).json({ success: false })
    }

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
const createFloor = async (req, res) => {
    try {
        let user_id = await getUserId(req);
        let tenant_id = await getTenantIdFromUser(user_id);

        const { floor_name } = req.body;
        let result = await pool.query(
            `INSERT INTO floors (tenant_id, floor_name) 
        VALUES('${tenant_id}','${floor_name}') RETURNING id, floor_name`);

        return res.status(200).json({ success: true, result })
    } catch (error) {
        return res.status(401).json({ success: false })
    }
}

// NOT DONE
const deleteFloor = async (req, res) => {
    try {
        // 1.First check if user is authenticated and get user ID from supabase
        let user_id = await getUserId(req);
        // 2. Get user tenant_id from db
        let tenant_id = await getTenantIdFromUser(user_id);
        let {floor_id} = req.body;
        // 3. DELETE floor from db based on table_id and tenant_id
        let result = await pool.query(`DELETE FROM floors WHERE id = '${floor_id}' AND tenant_id = '${tenant_id}'`);
        return res.status(200).json({ success: true, result });

    } catch (error) {
        return res.status(401).json({ success: false, error })
    }
}

const getFloors = async (req, res) => {
    try {
        // 1.First check if user is authenticated and get user ID from supabase
        let user_id = await getUserId(req);
        // 2. Get user tenant_id from db
        let tenant_id = await getTenantIdFromUser(user_id);
        // 3. Get all floors from db based on tenant_id
        let result = await pool.query(`SELECT * FROM floors WHERE tenant_id = '${tenant_id}'`);
        return res.status(200).json({ success: true, floors: result.rows });

    } catch (error) {
        return res.status(401).json({ success: false })
    }
}

module.exports = { createTable, deleteTable, getTables, saveTables, createFloor, deleteFloor, getFloors, createFloor }