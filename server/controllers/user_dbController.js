const { pool } = require('./dbConnection.js');
const { supabase } = require('../supabaseClient.js')

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

const getUserId = async (req) => {
    try {
        const token = req.cookies.access_token;
        if (!token) { throw new Error('No token') }
        const { data, error } = await supabase.auth.getUser(token);
        if (error) { throw new Error('Token problems') }
        return data.user.id;
    }
    catch (error) {
        throw error;
    }

}

const createTenant = async (req, res) => {
    try {
        let user_id = await getUserId(req);
        const { tenant_name, tenant_url } = req.body;
        //INSERT TENANT
        let result = await pool.query(`INSERT INTO tenants (tenant_name,tenant_url) VALUES('${tenant_name}', '${tenant_url}') RETURNING id`)
        let tenant_id = result.rows[0].id;

        // INSERT TENANT ID INTO user who created it
        let result2 = await pool.query(`UPDATE users SET tenant_id = '${tenant_id}' WHERE id = '${user_id}'`)
        return res.status(200).json({ success: true })
    } catch (error) {
        return res.status(401).json({ success: false, error })
    }
}

module.exports = { createUser, getUsers, createTenant }