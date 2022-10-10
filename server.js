const port = process.env.PORT || 3030;
const bodyparser = require('body-parser');
const express = require('express');
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



















app.listen(port,(error)=>{
    if(error) throw error;
    console.log(`Server started @ port ${port}`);
});