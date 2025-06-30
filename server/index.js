const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 4000
const { supabase } = require('./supabaseClient.js')
const { getUsers } = require('./controllers/user_dbController.js')
const cookieParser = require("cookie-parser");
const cors = require('cors');

const isAuthenticated = async (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) return res.redirect('/api/error');

    const { data, error } = await supabase.auth.getUser(token);
    if (error) return res.redirect('/api/error');
    next();

}

app.use(express.json());
app.use(cookieParser());
app.use(cors());

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
    res.cookie('access_token', data.session.access_token)
    res.sendStatus(200);
})

app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) { return res.json({ info: ' Problem logging in!', error }) }

        res.cookie("access_token", data.session.access_token);
        res.json({ info: 'Login succesful!' })
    }
    catch (error) {
        return res.json({ info: 'NO EMAIL OR PASSWORD', error });
    }

})

// Protected Routes!
app.use(isAuthenticated);

app.get('/api/logout', async (request, response) => {
    console.log('LOGGING OUT!!');
    response.clearCookie("access_token");
    response.sendStatus(200);
})

app.get('/api/protected', async (req, res) => {
    res.json({ info: 'You accessed a protected route!' });
})

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})
