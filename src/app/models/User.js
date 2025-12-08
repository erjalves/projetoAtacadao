import Sequelize, { Model } from 'sequelize'
import bcrypt from 'bcryptjs'

class User extends Model {
    static init(sequelize) {
        super.init(
            {
                username: {
                    type: Sequelize.STRING,
                    allowNull: false,
                    unique: true
                },

                password: {
                    type: Sequelize.VIRTUAL,
                },

                email: {
                    type: Sequelize.STRING,
                    allowNull: false,
                    unique: true
                },

                password_hash: {
                    type: Sequelize.STRING,
                },

                profile_picture: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },

                phone_number: {
                    type: Sequelize.STRING,
                    allowNull: false,
                    unique: true
                },

                last_login: {
                    type: Sequelize.DATE,
                    allowNull: false,
                },

                status: {
                    type: Sequelize.STRING,
                    allowNull: false,
                    defaultValue: 'ATIVO'
                }
            },

            {
                sequelize,

                //Sobrescrevendo o nome do model. O nome original inicia com letra Maíscula
                name: {
                    singular: 'user',
                    plural: 'users',
                }
            }

        )

        this.addHook('beforeSave', async user =>{
            if(user.password){
                user.password_hash = await bcrypt.hash(user.password,8)
            }
         })

    }

    checkPasssword(password){
        return bcrypt.compare(password,this.password_hash)
    }

    static associate(models){
        this.belongsTo(models.Employee, {foreignKey: 'employee_id'})
    }

}

export default User