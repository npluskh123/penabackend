import mongoose from "mongoose";

//создаем схему таблицы
const UserSchema = new mongoose.Schema({
    fullName:{
        type: String,
        require:true, //обязательное
    },
    email:{
        type: String,
        require:true, //обязательное
        unique: true, //уникальное
    },
    passwordHash:{
        type: String,
        require:true //обязательное
    },
    avatarUrl: String,
},
    {
        timestamps: true, 
    }
);

//экспортировать эту схему назвав ее user 
export default mongoose.model('User', UserSchema);