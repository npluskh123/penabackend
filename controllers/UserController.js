import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';
import UserModel from '../models/User.js';

export const register = async (req, res)=> { //если есть есть registerValidation, то выполняем (req, res)
    try{
        
  
const password = req.body.password;
const salt = await bcrypt.genSalt(10);        //алгоритм шифрования    
const hash = await bcrypt.hash(password, salt);

const doc = new UserModel({
    email: req.body.email,
    fullName: req.body.fullName,
    avatarUrl: req.body.avatarUrl,
    passwordHash: hash,
});

//создаем пользователя

const user = await doc.save();

const token = jwt.sign(
    {
    _id: user._id,
    },
    'sekret123',
    {
        expiresIn: '30d',    
    },
);

const {passwordHash, ...userData} = user._doc;

    //если ошибок нет
    res.json({
        ...user._doc,
        token,
    });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'не удалось зарегистрироваться',
        });
    }
};

export const login = async (req, res)=> {
    try{
        //ищем пользователя
        const user = await UserModel.findOne({email: req.body.email});

        if (!user){
            return res.status(404).json({
                message: 'Пользователь не неайден',
            });
        }

        const isValidaPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);

        //если логин пароль не сходятся
        if (!isValidaPass) {
            return res.status(403).json({
                message: 'Не верный логин или пароль',
            });
        }
        
        //если все норм 
        const token = jwt.sign(
            {
            _id: user._id,
            },
            'sekret123',
            {
                expiresIn: '30d',    
            },
        );
        const {passwordHash, ...userData} = user._doc;

        //если ошибок нет
        res.json({
            ...user._doc,
            token,
        });

    }catch(err){
    
        console.log(err);
        res.status(500).json({
            message: 'не удалось авторизироваться',
        });
    }
};

export const getMe = async (req, res)=> {
    try {
        const user = await UserModel.findById(req.userId);
        
        if (!user) {
            return res.status(404).json({
                message: 'пользователь не найден',
            });
        }
        const { passwordHash, ...userData } = user._doc;
        res.json(userData);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'нет доступа',
        });
    }
};