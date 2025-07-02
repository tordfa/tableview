const { pool } = require('./dbConnection.js');
const { getUserId, getTenantIdFromUser } = require('./user_dbController.js')


const createTable = async (req, res) => {
    try {
        let user_id = await getUserId(req);
        let tenant_id = await getTenantIdFromUser(user_id);

        const { table_name, table_number, table_seats, floor_id,x_pos,y_pos } = await req.body;
        let result = await pool.query(
            `INSERT INTO tables (tenant_id, table_name, table_number, table_seats, floor_id, x_pos, y_pos) 
        VALUES('${tenant_id}','${table_name}', '${table_number}', '${table_seats}', '${floor_id}', '${x_pos}', '${y_pos}') RETURNING id, tenant_id, table_name, table_number, table_seats, floor_id, x_pos, y_pos`);

        return res.status(200).json({ success: true, result })
    } catch (error) {
        return res.status(401).json({ success: false })
    }
}


const deleteTable = async (req, res) => {
    try {
        // 1.First check if user is authenticated and get user ID from supabase
        let user_id = await getUserId(req);
        // 2. Get user tenant_id from db
        let tenant_id = await getTenantIdFromUser(user_id);
        let { table_id } = await req.body;
        // 3. DELETE table from db based on table_id and tenant_id
        let result = await pool.query(`DELETE FROM tables WHERE id = '${table_id}' AND tenant_id = '${tenant_id}'`);
        return res.status(200).json({ success: true, result });
    } catch (error) {
        return res.status(401).json({ success: false, error })
    }
}

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

const saveTables = async (req, res) => {
    // {id: table_id, name: table_name, number: table_number, seats: table_seats, x: x_pos, y: y_pos floor_id: activefloor_id}
    try {
        let user_id = await getUserId(req);
        let tenant_id = await getTenantIdFromUser(user_id);
        let tables = await req.body;
        
        const values = [];
        const placeholders = tables.map((row, i) => {    
            const idx = i * 8;
            values.push(row.id, row.tenant_id, row.table_name, row.table_number, row.table_seats, row.x_pos, row.y_pos, row.floor_id);
            return `($${idx + 1}::uuid, $${idx + 2}::uuid, $${idx + 3}::text, $${idx + 4}::integer, $${idx + 5}::integer, $${idx + 6}::integer, $${idx + 7}::integer, $${idx + 8}::uuid)`;
        }).join(',');

        const query = `
                    UPDATE tables AS t
                    SET
                        table_name = v.table_name,
                        table_number = v.table_number,
                        table_seats = v.table_seats,
                        x_pos = v.x_pos,
                        y_pos = v.y_pos,
                        floor_id = v.floor_id
                    FROM (
                        VALUES ${placeholders}
                    ) AS v(id,tenant_id,table_name,table_number,table_seats,x_pos,y_pos,floor_id)
                     WHERE (t.id = v.id AND t.tenant_id = '${tenant_id}')
                    `;

        let result = await pool.query(query, values);

        return res.status(200).json({ success: true, result })
    } catch (error) {
        console.log(error);
        
        return res.status(401).json({ success: false })
    }
}

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

const deleteFloor = async (req, res) => {
    try {
        // 1.First check if user is authenticated and get user ID from supabase
        let user_id = await getUserId(req);
        // 2. Get user tenant_id from db
        let tenant_id = await getTenantIdFromUser(user_id);
        let { floor_id } = await req.body;
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

module.exports = { createTable, deleteTable, getTables, saveTables, createFloor, deleteFloor, getFloors, createFloor, saveTables }