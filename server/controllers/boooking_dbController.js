const { pool } = require('./dbConnection.js');
const { getUserId, getTenantIdFromUser } = require('./user_dbController.js')


const createBooking = async (req, res) => {
let tenant_id = "f870f012-4a66-4d73-9523-db79537c5948";
    // GET tenant id from URL?
    try {    
        const { customer_name, customer_email, customer_phone, booking_date, booking_duration, guests, note, allergies } = await req.body;
        
        let result = await pool.query(
            `INSERT INTO bookings (tenant_id, customer_name, customer_email, customer_phone, booking_date, booking_duration, guests, note, allergies) 
        VALUES('${tenant_id}','${customer_name}', '${customer_email}', '${customer_phone}', '${booking_date}', '${guests}', '${booking_duration}' , '${note}', '${allergies}')`);

        return res.status(200).json({ success: true, result })
    } catch (error) {
        console.log("error: ", error);
        
        return res.status(401).json({ success: false , error})
    }
}

// NOT WORKED ON
const editBooking = async (req, res) => {
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

const deleteBooking = async (req, res) => {
    try {
        // 1.First check if user is authenticated and get user ID from supabase
        let user_id = await getUserId(req);
        // 2. Get user tenant_id from db
        let tenant_id = await getTenantIdFromUser(user_id);
        let { floor_id } = await req.body;
        
        // 3. DELETE floor from db based on table_id and tenant_id
        let result = await pool.query(`DELETE FROM floors WHERE id = '${floor_id}' AND tenant_id = '${tenant_id}' RETURNING id`);
        return res.status(200).json({ success: true, result });

    } catch (error) {
        return res.status(401).json({ success: false, error })
    }
}

const getBookings = async (req, res) => {

    // GET TENANT ID FROM URL
    try {
        // 2. Get user tenant_id from db
        let tenant_id = await getTenantIdFromUser(user_id);
        // 3. Get all bookings from db based on tenant_id
        let result = await pool.query(`SELECT * FROM bookings WHERE tenant_id = '${tenant_id}'`);
        return res.status(200).json({ success: true, bookings: result.rows });

    } catch (error) {
        return res.status(401).json({ success: false })
    }
}

module.exports = { createBooking, editBooking, deleteBooking, getBookings }