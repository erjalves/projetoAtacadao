import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import authConfig from '../../config/auth.js'

class SessionsController{

    async create(req,res){
        
        const {email, password} = req.body

        const user = await User.findOne({
            where: {email}
        })

        if(!user){
            return res.status(401).send({message: 'User not found!'})
        }

        if(!(await user.checkPasssword(password))){
            return res.status(401).send({message: 'Password not found!'})
        }

        const {id} = user

        return res.json({
            user: {
                id,
                email,
            },
            token: jwt.sign({id},authConfig.secret,{expiresIn: authConfig.expiresIn})

        })

    }

}

export default new SessionsController()