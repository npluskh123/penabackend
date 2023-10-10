import { body } from 'express-validator';
//import { isString } from 'utils';

export const loginValidation = [
  body('email', 'неверный формат почты').isEmail(),
  body('password', 'пароль минимум 5').isLength({ min: 5 }),
];

export const registerValidation = [
  body('email', 'неверный формат почты').isEmail(),
  body('password', 'пароль минимум 5').isLength({ min: 5 }),
  body('fullName', 'укажите имя').isLength({ min: 3 }),
  body('avatarUrl', 'неверная ссылка на аватар').optional().isURL(),
];

export const postCreateValidation = [
  //body('numberCarpet', 'ddtlbnt yjdfsdnf').isLength({ min: 3 }).isString(),
  //   body('title','введите заголовок').isLength({min: 3}).isString(),
  //   body('text','введите текст').isLength({min: 10}).isString(),
  //   body('tags', 'sdfdsfsf').isString(),
  // //  body('tags','неверный формат тегов(укажите массив)').optional.isString(),
  //   body('imageUrl','неверная ссылка на изображение').optional().isString(),
];
