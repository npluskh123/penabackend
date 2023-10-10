//статьи
import PostModel from '../models/Post.js';

export const getLastTags = async (req, res) => {
  try {
    const posts = await PostModel.find().limit(5).exec();

    const tags = posts.map((obj) => obj.tags.flat().slice(0, 5));

    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'не удалось получить статьи',
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const posts = (await PostModel.find().populate('user').exec()).reverse();
    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'не удалось получить статьи',
    });
  }
};

export const getAtWork = async (req, res) => {
  try {
    const posts = (await PostModel.find().populate('user').exec()).filter((status = 0));
    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'не удалось получить статьи',
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;

    PostModel.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        $inc: { views: 1 },
      },
      {
        returnDocument: 'after',
      },
    )
      .then((doc) => {
        if (!doc) {
          return res.status(404).json({ message: 'Request post not found', error: err });
        }
        res.json(doc);
      })
      .catch((err) => {
        if (err) {
          return res.status(403).json({ message: 'Posts not found', error: err });
        }
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'не удалось получить статьи',
    });
  }
};

export const remove = async (req, res) => {
  try {
    const postId = req.params.id;

    PostModel.findOneAndDelete({
      _id: postId,
    })
      .then((doc) => {
        if (!doc) {
          return res.status(500).json({
            message: 'Статья не найдена',
          });
        }

        res.json({
          success: true,
        });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({
          message: 'Нет удалось удалить статью',
        });
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'не удалось получить статьи',
    });
  }
};

export const create = async (req, res) => {
  try {
    //подготовка документа
    const doc = new PostModel({
      numberCarpet: req.body.numberCarpet,
      surname: req.body.surname,
      adress: req.body.adress,
      date: req.body.date,
      payment: req.body.payment,
      length: req.body.length,
      width: req.body.width,
      category: req.body.category,
      sum: req.body.sum,
      telephone: req.body.telephone,
      comment: req.body.comment,
      status: req.body.status,
      user: req.userId,
      imageUrl: req.body.imageUrl,

      // title: req.body.title,
      // text: req.body.text,
      // imageUrl: req.body.imageUrl,
      // tags: req.body.tags,
      // user: req.userId,
    });

    //создание документа
    const post = await doc.save();

    //возвращаем ответ
    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'не удалось создать статью',
    });
  }
};

export const update = async (req, res) => {
  try {
    const postId = req.params.id;

    await PostModel.updateOne(
      {
        _id: postId,
      },
      {
        numberCarpet: req.body.numberCarpet,
        surname: req.body.surname,
        adress: req.body.adress,
        date: req.body.date,
        payment: req.body.payment,
        length: req.body.length,
        width: req.body.width,
        category: req.body.category,
        sum: req.body.sum,
        telephone: req.body.telephone,
        comment: req.body.comment,
        status: req.body.status,
        user: req.userId,
        imageUrl: req.body.imageUrl,
        // title: req.body.title,
        // text: req.body.text,
        // imageUrl: req.body.imageUrl,
        // tags: req.body.tags,
        // user: req.userId,
      },
    );

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'не удалось обновить статью',
    });
  }
};
