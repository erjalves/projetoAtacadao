import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import authConfig from '../../config/auth.js'
import Role from '../models/Role.js'
import Permission from '../models/Permission.js'
import Employee from '../models/Employee.js'

class SessionsController {

    async create(req, res) {

        const { email, password } = req.body

        const user = await User.findOne({
            where: { email }
        })

        if (!user) {
            return res.status(401).send({ message: 'User not found!' })
        }

        if (!(await user.checkPasssword(password))) {
            return res.status(401).send({ message: 'Password not found!' })
        }

        const { id } = user

        return res.json({
            user: {
                id,
                email,
            },
            token: jwt.sign({ id }, authConfig.secret, { expiresIn: authConfig.expiresIn })

        })

    }

    async getPermissions(id) {

        const user = await User.findOne({
            where: {
                id
            },

            include: [
                {
                    model: Employee,
                    attributes: ['name'],

                    include: [
                        {
                            model: Role,
                            attributes: ['name'],

                            include: [
                                {
                                    model: Permission,
                                    attributes: ['name'],

                                    through: { attributes: [] }
                                },
                            ]
                        }
                    ]
                }
            ]
        })

        //const permissions = user.map(usuario => usuario.employee.role.permissions.map(p => p.name))

        const permissions = user.employee.role.permissions.map(p => {

            const newPermission = {

                'permission': p.name

            }

            return newPermission
        })

        return permissions
    }

}

export default new SessionsController()