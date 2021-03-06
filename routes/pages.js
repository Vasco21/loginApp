const express = require('express');
const User = require('../core/user')
const router = express.Router();

const user = new User();

// get index page
router.get('/', (req, res, next) => {
    res.render('index', {title: "my application"})
});

// home pages
router.get('/home', (req, res, next) => {
    res.send('this is home page')
});



// post login data
router.post('/login', (req, res, next) => {
    user.login(req.body.username, req.body.password, function(result){
        if(result){
            res.send('Logged in as: '+ result.username);
        }else{
            res('Username/Password is incorrect!');
        }
    }) 
})

// post register data
router.post('/register', (req, res, next) => {
    let userInput = {
        username : req.body.username,
        fullname : req.body.fullname,
        password : req.body.password
    }
    user.create(userInput, function(lastId){
        if(lastId){
            res.send('Welcome '+ userInput.username)
        }else{
            console.log('Error creating a new user ....')
        }
    })
})

module.exports = router;