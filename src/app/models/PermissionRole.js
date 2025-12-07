import Sequelize, { Model } from 'sequelize'

class PermissionRole extends Model {
    static init(sequelize) {
        super.init({},

            {
                sequelize,

                //Sobrescrevendo o nome do model. O nome original inicia com letra Maíscula
                name: {
                    singular: 'permission_role',
                    plural: 'permission_roles',
                }
            }
        )
    }
    static associate(models){
        this.belongsTo(models.Role,{foreignKey: 'role_id'})
        this.belongsTo(models.Permission, {foreignKey: 'permission_id'})
    }

}

export default PermissionRole