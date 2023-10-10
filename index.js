import express from 'express';
import fs from 'fs';
import mongoose from 'mongoose';
import multer from 'multer';
import cors from 'cors';

import { registerValidation, loginValidation, postCreateValidation } from './validations.js';
import { handleValidationErrors, checkAuth } from './utils/index.js';

import { UserController, PostController } from './controllers/index.js';
//"^7.5.0",
mongoose
  .connect(
    'mongodb+srv://niknikeh54:CO0QHriqhZISQdJx@cluster0.tifzxlg.mongodb.net/blog?retryWrites=true&w=majority',
    //process.env.MONGODB_CONNECT_URI,
  )
  .then(() => console.log('DB ok'))
  .catch((err) => console.log('DB error', err));

const app = express();

//хранилище картинок
const storage = multer.diskStorage({
  //путь для сохранения
  destination: (_, __, cb) => {
    if (!fs.existsSync('uploads')) {
      fs.mkdirSync('uploads');
    }
    cb(null, 'uploads'); //в папку uploads
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname); //в папку uploads
  },
});
const upload = multer({ storage });

app.use(express.json());

app.use(cors());
app.use('/uploads', express.static('uploads')); //отправляет запрос в папку uploads
//авторизация
app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login);
//регистрация
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe);

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});
app.get('/posts/tags', PostController.getLastTags);
app.post('/posts', checkAuth, postCreateValidation, handleValidationErrors, PostController.create);
app.patch('/posts/:id', checkAuth, handleValidationErrors, PostController.update);
app.get('/posts', PostController.getAll);
app.get('/posts/atWork', PostController.getAtWork);
app.get('/posts/get', PostController.getLastTags);
app.get('/posts/:id', PostController.getOne);
app.delete('/posts/:id', checkAuth, PostController.remove);

const PORT = process.env.PORT || 8080;
app.listen(PORT, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log('Server OOK' + PORT);
});
