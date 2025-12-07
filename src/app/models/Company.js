import Sequelize, { Model } from 'sequelize'

class Company extends Model {
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
                    singular: 'company',
                    plural: 'companies',
                }
            }
        )
    }

    static associate(models){
        this.belongsTo(models.Branch, {foreignKey: 'branch_id'})
        this.hasMany(models.Employee)
    }

}

export default Company