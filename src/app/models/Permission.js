import Sequelize, { Model } from 'sequelize'

class Permission extends Model {
    static init(sequelize) {
        super.init(
            {

                name: {
                    type: Sequelize.STRING,
                    unique: true
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
                    singular: 'permission',
                    plural: 'permissions',
                }
            }
        )
    }

    static associate(models){
        this.belongsToMany(models.Role,{through: models.PermissionRole})
    }

}

export default Permission