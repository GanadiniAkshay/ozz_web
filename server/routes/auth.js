import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/users';

import config from '../../config';

let router = express.Router();

router.post('/',(req, res) => {
    const errors = {};

    const { email, password } = req.body;

    User.findOne({email:email},function(err,user){
        if (err){
            res.status(400).json({error:err});
        } else{
            if (user){
                if (bcrypt.compareSync(password,user.password)){
                    const token = jwt.sign({
                        email: user.email,
                        name: user.name
                    },config.jwtSecret)
                    res.json({ success: true, token: token});
                } else{
                    errors.password = 'Incorrect password';
                    res.status(400).json(errors);
                }
            } else{
                errors.email = 'No account exists with that email';
                res.status(400).json(errors);
            }
        }
    });
});

export default router;