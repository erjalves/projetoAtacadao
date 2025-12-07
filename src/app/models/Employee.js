import Sequelize, { Model } from 'sequelize'

class Employee extends Model {
    static init(sequelize) {
        super.init(
            {
                registration_number: {
                    type: Sequelize.STRING,
                    allowNull: false,
                    unique: true
                },

                name: {
                    type: Sequelize.STRING,
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
                    singular: 'employee',
                    plural: 'employees',
                }
            }
        )
    }

    static associate(models){
        this.belongsTo(models.Company, {foreignKey: 'company_id'})
        this.belongsTo(models.Role, {foreignKey: 'role_id'})
        this.belongsTo(models.Branch, {foreignKey: 'branch_id'})
        this.belongsTo(models.Department, {foreignKey: 'department_id'})
        this.hasMany(models.User)
    }

}

export default Employee