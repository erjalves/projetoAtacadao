import Sequelize from 'sequelize'
import config from '../config/database.js'
import Permission from '../app/models/Permission.js'
import Role from '../app/models/Role.js'
import PermissionRole from '../app/models/PermissionRole.js'
import Department from '../app/models/Department.js'
import Branch from '../app/models/Branch.js'
import Company from '../app/models/Company.js'
import Employee from '../app/models/Employee.js'
import User from '../app/models/User.js'


const models = [Permission,Role,PermissionRole,Department,Branch,Company,Employee,User]

class Database{
    constructor(){
        this.connection = new Sequelize(config)
        this.init()
        this.associate()
    }

    init(){
        models.forEach(model => model.init(this.connection))
    }

    associate(){
        models.forEach(model =>{
            if(model.associate){
                model.associate(this.connection.models)
            }
        })
    }
}

export default new Database()