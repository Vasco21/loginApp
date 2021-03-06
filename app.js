const express = require('express');
const app = express();
// const session = require('express-session');
const path = require('path');
const pageRouter = require('./routes/pages');

// for body parser. to collect data that sent from the client.
app.use(express.urlencoded( { extended : false}));

// Serve static files. CSS, Images, JS files ... etc
app.use(express.static(path.join(__dirname, 'public')));

// Template engine. PUG
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// var loginUsers = loginUser(pool)

// routers
app.use('/', pageRouter);

// error : page not found
app.use((err, req, res, next)=>{
    var err = new Error('page not found');
    err.status = 404;
    next(err);
});

// handling error
app.use((err, req, res, next)=>{
    res.status(err.status || 500);
    res.send(err.message);
})



// Setting up the server
app.listen(3000, () => {
    console.log('Server is running on port 3000...');
});

module.exports = app;