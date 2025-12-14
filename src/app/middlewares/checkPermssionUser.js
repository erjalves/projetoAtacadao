import Session from '../controllers/SessionsController.js'

class checkPermssionUser {

    async searchUser(req, res, next) {

        try {
            const permissions = await Session.getPermissions(req.user_id)
            
            const providedPermissions = permissions.map(item => item.permission)

            const hasPermissionRequired = permissions.every(permission => providedPermissions.includes('CONSULTA DE USUARIOS'))
            
            if(hasPermissionRequired){
                return next()
            }
            else{
                return res.status(401).json({ message: 'Access not Allowed!' })
            }

        } catch (error) {
            return res.status(401).json({ message: 'Persmissions were not provided!' })
        }

    }

    async createUser(req, res, next) {

        try {
            const permissions = await Session.getPermissions(req.user_id)
            
            const providedPermissions = permissions.map(item => item.permission)

            const hasPermissionRequired = permissions.every(permission => providedPermissions.includes('CADASTRO DE USUARIOS'))
            
            if(hasPermissionRequired){
                return next()
            }
            else{
                return res.status(401).json({ message: 'Access not Allowed!' })
            }

        } catch (error) {
            return res.status(401).json({ message: 'Persmissions were not provided!' })
        }
 
    }

    async updateUser(req, res, next) {

        try {
            const permissions = await Session.getPermissions(req.user_id)
            
            const providedPermissions = permissions.map(item => item.permission)

            const hasPermissionRequired = permissions.every(permission => providedPermissions.includes('ALTERAR DE USUARIOS'))
            
            if(hasPermissionRequired){
                return next()
            }
            else{
                return res.status(401).json({ message: 'Access not Allowed!' })
            }

        } catch (error) {
            return res.status(401).json({ message: 'Persmissions were not provided!' })
        }
 
    }
}

export default new checkPermssionUser()