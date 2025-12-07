import Sequelize, { HasMany, Model } from 'sequelize'

class Role extends Model {
    static init(sequelize) {
        super.init(
            {

                name: {
                    type: Sequelize.STRING,
                    allowNull: false,
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
                    singular: 'role',
                    plural: 'roles',
                }
            }
        )
    }

    static associate(models) {
        this.belongsToMany(models.Permission, { through: models.PermissionRole })
        this.hasMany(models.Employee)
    }

}

export default Role