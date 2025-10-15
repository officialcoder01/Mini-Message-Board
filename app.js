require('dotenv').config();
const express = require('express');
const app = express();
const indexRouter = require('./routes/indexRouter');
const path = require('node:path');

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));

app.set('view cache', false)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/', indexRouter);

app.listen(PORT, (error) => {
    if (error) {
        throw error;
    };
    console.log(`Server is running on http://localhost:${PORT}`);
});