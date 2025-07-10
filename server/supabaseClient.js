require('dotenv').config();

const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.EXPRESS_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPRESS_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

module.exports={ supabase }