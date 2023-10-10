//функция проверят секретную информацию для возвращения

import jwt from 'jsonwebtoken';

export default (req, res, next)=> {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/,  '');

    if (token) {
       try {
            const decoded = jwt.verify(token, 'sekret123');

            req.userId = decoded._id;
            next();
       } catch (err) {
            return res.status(403).json({
             message:'net dostypa',
            });
       } 
    } else{
        return res.status(403).json({
            message:'net dostypa',
        });
    }
};