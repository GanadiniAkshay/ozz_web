import express from 'express';
import validateInput from '../shared/validations/signup';
import bcrypt from 'bcrypt';

import User from '../models/users';

let router = express.Router();

router.post('/',(req,res) => {
    const { errors, isValid } = validateInput(req.body);

    if (isValid) {
        const { name, email, password } = req.body;
        const password_digest = bcrypt.hashSync(password, 10);

        var user = new User({
            name: name,
            email: email,
            password: password_digest,
            joined: Date() 
        });

        user.save(function(err){
            if (err){
                if (err.code == 11000){
                    errors.email = 'An account already exists for that email';
                    res.status(400).json(errors);
                } else{
                    res.status(400).json({error:err})
                }
            }else{
                res.json({ success: true});
            }
        })
    } else{
        res.status(400).json(errors);
    }
});

export default router;