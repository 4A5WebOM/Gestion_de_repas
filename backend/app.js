require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userRoute = require('./routes/userRoute');

const app = express();

// Middleware
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    console.log(req.body);
    next();
});

app.use('/api/users', userRoute);

// Connection à la base de données MongoDB
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connecté à la base de données MongoDB');
        app.listen(process.env.PORT, () => {
            console.log(`Serveur est connecté au port ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.error(err);
    });