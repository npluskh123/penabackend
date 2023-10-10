import mongoose from 'mongoose';

//создаем схему таблицы
const PostSchema = new mongoose.Schema(
  {
    numberCarpet: {
      type: String,
    },
    surname: {
      type: String,
    },
    adress: {
      type: String,
      //require:true, //обязательное
      //unique: true, //уникальное
    },
    date: {
      type: String,
    },
    payment: {
      type: Boolean,
      default: false,
    },
    length: {
      type: Number,
    },
    width: {
      type: Number,
    },
    category: {
      type: Number,
    },
    sum: {
      type: Number,
      default: 0,
    },
    telephone: {
      type: String,
    },
    comment: {
      type: String,
    },
    status: {
      type: Number,
    },
    //колличество просмотров
    // viewCount: {
    //   type: Number,
    //   default: 0,
    // },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', //связь между таблицами
      require: true,
    },
    imageUrl: String,
  },

  {
    timestamps: true,
  },
);

//экспортировать эту схему назвав ее Post
export default mongoose.model('Post', PostSchema);
