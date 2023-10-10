import { validationResult } from "express-validator";


export default (req, res, next) => {
const errors = validationResult(req); //получаем ошибки
    if (!errors.isEmpty()){
        return res.status(400).json(errors.array()); 
    }

    next();

}