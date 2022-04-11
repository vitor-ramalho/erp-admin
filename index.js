const express = require('express');
const userRoutes = require('./src/routes/UserRoute');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./src/Model/User');
const productRoutes = require('./src/routes/ProductRoute');
require('dotenv').config()
const PORT = 3001;

mongoose.connect(
    process.env.DB_CONNECT,
    { useNewUrlParser: true },
    () => console.log('Conectado ao banco de dados')
)

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use('', userRoutes);
app.use('', productRoutes);


app.listen(PORT, () => console.log(`Server runing on port: ${PORT}`));