const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const {UserModel} = require('../models/User.model')

// const userRegister = async (req, res)=>{
//     const {username,email,pass} = req.body
//     try {
//         bcrypt.hash(pass,4,async(err,hashed)=>{
//             const user = new UserModel({username,email,pass:hashed})
//             await user.save()
//             return res.status(200).json({msg:'new user added'})
//         })
//     } catch (error) {
//         return res.status(400).json(error.message)
//     }
// }

const userRegister = async (req, res) => {
    const { username, email, pass } = req.body;
    try {
        const hashed = await bcrypt.hash(pass, 4);

        const user = new UserModel({ username, email, pass: hashed });
        await user.save();

        return res.status(200).json({ msg: 'New user added' });
    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(400).json({ error: 'Failed to register user' });
    }
};



const userLogin = async (req, res)=>{
    const {email,pass} = req.body
    const user = await UserModel.findOne({email})
    if(!user){
        return res.status(200).json({msg:'user not registered'})
    }
    try {
        bcrypt.compare(pass,user.pass,async(err,result)=>{
            if(result){
                const token= jwt.sign({userID:user._id, username:user.username}, "verification")
                return res.status(200).json({msg:"Login Successfull!", token})
            }else{
                return res.status(200).json({msg:"Wrong Password!!"})
            }
        })
    } catch (error) {
        return res.status(400).json({error:error.message})
    }
}

// const getUserProfile = async (req, res)=>{
    

// }

// const updateUserProfile = async (req, res)=>{

// }

module.exports = {
    userRegister, userLogin
}