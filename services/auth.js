const JWT = require("jsonwebtoken")

const secret = "$uperman@India123"

function createUserToken(user){
    const payload = {
        _id: user.id,
        fullName:user.fullName,
        email: user.email,
        profilePhoto: user.profilePhoto,
        role: user.role
    } 

    const token = JWT.sign(payload,secret);
    return token;
}

function validateToken(token){
    const payload = JWT.verify(token,secret);
    return payload
}

module.exports= {
    createUserToken,
    validateToken

}