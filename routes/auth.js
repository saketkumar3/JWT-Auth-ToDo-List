const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

router.post('/register', async (req, res) => {


try{
    const { username, email, password } =req.body;
    const user = new User({ username, email, password });
    await user.save();
    const payload = {
        id: user._id,
        username: user.username,
      };

    const token = jwt.sign(payload,process.env.JWT_SECRET,{ expiresIn: '1h'});

    res.status(201).send({ token});

} catch(error){
    res.status(400).send(error);
}

router.post('/login', async (req, res) =>{

    const payload = {
        id: user._id,
        username: user.username,
      };
    try{
        const {email, password} = req.body;
        const user = await User.findOne({ email});

        if(!user) {
            return res.status(400).send({ error: 'Invalid login details' });
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);

        if(!isPasswordMatched){
            return res.status(400).send({error: 'Invalid login details'});
        }

        const token = jwt.sign(payload,process.env.JWT_SECRET,{ expiresIn: '1h'});
        res.send({ token });
    } catch(error){
        res.status(400).send(error);
    }
});

});

module.exports = router;