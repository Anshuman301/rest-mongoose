const mongoose =require('mongoose');
const validator = require('validator')
mongoose.connect('mongodb+srv://Anshuman:IJf6Q1bwkOJRx86X@cluster0-7nrdg.mongodb.net/test?retryWrites=true&w=majority',{useUnifiedTopology:true,useNewUrlParser:true})

const Schema = mongoose.Schema

const userSchema = new Schema({
    name:{
        type:String,
        require:true,
        trim:true
    },
    age:{
        type:Number,
        required:true,
        validate(value){
            if(value < 0)
            throw new Error('Age must not be negative')
        }
    },
    email:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isEmail(value))
                throw new Error('It Shoul be an email')
        }
    },
    password:{
        type:String,
        required:true,
        minlength:5
    }
})

const User = mongoose.model('User',userSchema)

module.exports = User

// const user1 = new User({
//     name:'Jone Doe',
//     age:20,
//     email:'john@gmail.com'
// })

// user1.save()
// .then(res => console.log(res))
// .catch(err => console.log(err))

