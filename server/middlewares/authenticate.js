import jwt from 'jsonwebtoken';
import config from '../../config';

import User from '../models/users';

export default (req,res,next) => {
    const authorizationHeader = req.headers['authorization'];

    let token;

    if (authorizationHeader){
        token = authorizationHeader.split(' ')[1];
    }

    if (token){
        jwt.verify(token, config.jwtSecret, (err, decoded) => {
            if (err){
                res.status(401).json({
                    error: 'Cannot Verify Token'
                })
            } else{
                req.currentUser = {email:decoded.email,name:decoded.name};
                next();
            }
        });
    } else{
        res.status(403).json({
            error : 'No Token Provided'
        });
    }
}