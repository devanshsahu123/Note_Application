const express = require("express")
const apiRoutes = require("./routes/api.js")
const dotenv = require('dotenv')
const i18n = require('./config/i18n.js');
const app = express();
const connectDB = require('./config/db.js')
const cors = require('cors')

dotenv.config()
connectDB()
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(i18n.init)

const port = process.env.PORT;

app.use('/api' ,apiRoutes );

app.listen(port , ()=>{
    console.log(`server listen at http://localhost:${port}`)
})