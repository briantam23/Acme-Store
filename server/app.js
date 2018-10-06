const express = require('express');
const app = express();
const path = require('path');


app.use(require('body-parser').json());
app.use('/public', express.static(path.join(__dirname, '../public')));
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../public/index.html')));

app.use('/api/orders', require('./routes/orders'));
app.use('/api/products', require('./routes/products'));


app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send({ error: err.message });
})


module.exports = app;