const mongoose = require("mongoose")
const {createHmac , randomBytes} = require("crypto")
const {createUserToken} = require("../services/auth")

const userSchema = new mongoose.Schema({
    fullName : {
        type : String,
        required: true,       
    },
    email: {
        type : String,
        required: true, 
        unique : true
    },
    password: {
        type : String,
        required: true, 
    },
    salt : {
        type : String,       
    },
    profilePhoto:{
        type : String,
        default : "/images/default.avif" 
    },
    role:{
        type : String,
        enum: ["USER","ADMIN"],
        default : "USER"  
    }
},{timestamps: true})

userSchema.pre("save",function(next){
    const user = this
    
    if(!user.isModified("password")) return;

    const salt = randomBytes(16).toString();

    const hashPassword = createHmac("sha256",salt).update(user.password).digest('hex');

    this.salt = salt
    this.password = hashPassword

    next();

})

userSchema.static("matchPasswordAndGenerateToken",async function(email,password){
    const user = await this.findOne({email})
    if(!user) throw new Error("Invalid Email or Password")
    const salt = user.salt
    const hashPassword = user.password
    const userProvidePassword = createHmac("sha256",salt).update(password).digest('hex');

    if(hashPassword !== userProvidePassword) throw new Error("Invalid Email or Password")
    
    const token = createUserToken(user);
    return token

})



const User = mongoose.model("user", userSchema)

module.exports = User;