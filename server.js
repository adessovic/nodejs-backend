const port = process.env.PORT || 3030;
const bodyparser = require('body-parser');
const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const app = express();

app.use(cors({
    origin: '*',
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));

//app.use(express.static(__dirname + '/'));
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())

const allUsers = require('./users.json');

// ENDPOINTS
app.get('/',(req, res)=>{
    console.log('route: /');
    res.send('Hello');
});

// Get all users
app.get('/users',(req, res)=>{
    console.log('route: /json');
    res.json(allUsers);
});

// Find user by email
app.get('/users/:email',(req, res)=>{
    const _email = req.params.email;
    console.log(`findUserEmail: ${_email}`);

    // invalid email
    if(!_email){
        res.json({ message : 'Missing User Email' });
        return;
    }

    const userData = allUsers.find(u => u.email === _email);
    res.json({
        data : ( userData ? userData : `No user found` )
    });
});

// Hash user password
app.get('/hash/:pw',(req,res)=>{

    const plainTextPassword = req.params.pw;
    const hasPassword = plainTextPassword.trim();

    if(!hasPassword){
        res.json({ message: 'no password was provided' });
        return;
    }

    // Create a salt & hash of the password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(plainTextPassword, salt);

    res.json({
        salt, hash,
        pw : plainTextPassword,
    });
});




app.listen(port,(error)=>{
    if(error) throw error;
    console.log(`Server started @ port ${port}`);
});