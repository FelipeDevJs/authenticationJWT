const express = require('express');
const  bcrypt = require('bcryptjs');

const User = require('../models/user');

const router = express.Router();


router.post('/register', async (req, res) => {
    const {email} = req.body;
    
    try {

        if(await User.findOne({ email }))
            return res.status(400).send({error:'Email já cadastrado'});
            
        const user = await User.create(req.body);

        user.password = undefined;

        return res.send({ user });
    } catch(err) {
        return res.status(400).send({error: 'Registration Failed'});
    }
});

router.post('/authenticate', async (req, res, next) => {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email }).select('+password');

    if(!user)
        return res.status(400).send({ error: 'error not found'});

    if(!await bcrypt.compare(password, user.password))
        return res.status(400).send({ error: 'Invalid password'});
    
    res.send('logado');
});

module.exports = app => app.use('/auth', router);