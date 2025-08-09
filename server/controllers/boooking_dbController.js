const { pool } = require('./dbConnection.js');
const { getUserId, getTenantIdFromUser } = require('./user_dbController.js')


const createBooking = async (req, res) => {
    try {
        const { tenant_url, customer_name, customer_email, customer_phone, booking_date, booking_time, guests, note } = await req.body;
        // 1. Get tenant_id from Tenant table
        const tenantResult = await pool.query(
            'SELECT id FROM tenants WHERE tenant_url = $1',
            [tenant_url]
        );

        if (tenantResult.rowCount === 0) {
            throw new Error("Tenant not found!")
        }
        console.log(tenantResult.rows[0].id);
        
        let result = await pool.query(
            `INSERT INTO bookings (tenant_id, customer_name, customer_email, customer_phone, booking_date, booking_time, booking_duration, guests, note, allergies) 
        VALUES('${tenantResult.rows[0].id}','${customer_name}', '${customer_email}', '${customer_phone}', '${booking_date}', '${booking_time}', '2', '${guests}' , '${note}', 'none')`);

        return res.status(200).json({ success: true, result })
    } catch (error) {
        console.log("error: ", error);

        return res.status(401).json({ success: false, error })
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

    try {
        // 1.First check if user is authenticated and get user ID from supabase
        let user_id = await getUserId(req);
        // 2. Get user tenant_id from db
        let tenant_id = await getTenantIdFromUser(user_id);

        // 2. Get bookings by tenant_id
        const bookingsResult = await pool.query(
            'SELECT * FROM bookings WHERE tenant_id = $1',
            [tenant_id]
        );

        res.json(bookingsResult.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const getOpenBookings = async (req, res) => {

    const { tenantName } = req.params;
    try {
        // 1. Get tenant_id from Tenant table
        const tenantResult = await pool.query(
            'SELECT id FROM tenants WHERE tenant_url = $1',
            [tenantName]
        );

        if (tenantResult.rowCount === 0) {
            return res.status(404).json({ error: 'Tenant not found' });
        }

        const tenant_id = tenantResult.rows[0].id;
        const { chosenDate } = await req.body;

        let openingTime = '10:00:00';
        let closingTime = '20:00:00';
        // 1. Generating a series of available timeslots based on tenant settings.
        // 2. Checks for number of booking at that date-time.
        // 3. Returns a table with booking time, number of bookings and isAvailable Boolean


        const query = `
                        WITH timeslots AS (
                            SELECT generate_series(
                            TIMESTAMP '1995-07-13' + $1::time,
                            TIMESTAMP '1995-07-13' + $2::time,
                            INTERVAL '30 minutes'
                            )::TIME AS booking_time
                        ),
                        bookings_count AS (
                            SELECT booking_time, COUNT(*) AS num_bookings
                            FROM bookings
                            WHERE booking_date = $3 AND tenant_id = $4
                            GROUP BY booking_time
                        )
                        SELECT
                            t.booking_time,
                            COALESCE(b.num_bookings, 0) AS num_bookings,
                            CASE
                            WHEN COALESCE(b.num_bookings, 0) >= 5 THEN FALSE
                            ELSE TRUE
                            END AS is_available
                        FROM timeslots t
                        LEFT JOIN bookings_count b ON t.booking_time = b.booking_time
                        ORDER BY t.booking_time;
                    `;

        const values = [openingTime, closingTime, chosenDate, tenant_id];


        const bookingsResult = await pool.query(query, values);
        res.json({ success: true, result: bookingsResult.rows });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = { createBooking, editBooking, deleteBooking, getBookings, getOpenBookings }