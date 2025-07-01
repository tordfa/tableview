const express = require('express')
const app = express()
const port = 4000
const { supabase } = require('./supabaseClient.js')
const cookieParser = require("cookie-parser");
const cors = require('cors');
const {createUser ,createTenant} = require('./controllers/user_dbController.js');
const { createTable, getTables } = require('./controllers/table_dbController.js');

const isAuthenticated = async (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) return res.sendStatus(401);

    const { data, error } = await supabase.auth.getUser(token);

    if (error) {

        return res.sendStatus(401);
    }
    next();

}

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200
}

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

app.get('/', async (req, response) => {
    console.log(req.body);

    response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/api/error', async (request, response) => {
    response.json({ info: 'Error! Not Authenticated' })
})

app.post("/api/signup", async (req, res) => {
    const { email, password } = req.body;
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
        return res.status(401).json({ info: 'Error signing up!', error })
    }
    createUser(data.user.id,data.user.email);
    res.cookie('access_token', data.session.access_token)
    res.sendStatus(200);
})

app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) { return res.status(401).json({ info: ' Problem logging in!', error }) }

        res.cookie("access_token", data.session.access_token);
        res.json({ info: 'Login succesful!' })
    }
    catch (error) {
        return res.status(401).json({ info: 'NO EMAIL OR PASSWORD', error });
    }

})

// Protected Routes!
app.use(isAuthenticated);

app.get('/api/auth', async (request, response) => {
    response.sendStatus(200);
})

app.get('/api/logout', async (request, response) => {
    response.clearCookie("access_token");
    response.sendStatus(200);
})

app.get('/api/protected', async (req, res) => {
    res.json({ info: 'You accessed a protected route!' });
})

app.post('/api/createtenant', createTenant )

app.post('/api/createtable', createTable)

app.get('/api/gettables', getTables)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})
