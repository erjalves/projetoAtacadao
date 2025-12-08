import jwt from 'jsonwebtoken'
import { promisify } from 'util'
import authConfig from '../../config/auth.js'


export default async (req, res, next) => {
   const authHeader = req.headers.authorization

   if (!authHeader) {
      return res.status(401).json({ message: 'Token was not provided!' })
   }

   const [, token] = authHeader.split(" ")

   try {
      const decoded = await promisify(jwt.verify)(token, authConfig.secret)
      //Cria um novo campo no retorno da consulta para disponibilizar o id do usuário autenticado
      req.user_id = decoded.id
      return next()

   } catch (error) {
      return res.status(401).json({ message: 'Invalid token!' })
   }

}