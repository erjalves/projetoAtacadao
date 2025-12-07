import Sequelize, { Model } from 'sequelize'

class Department extends Model {
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
                    singular: 'department',
                    plural: 'departments',
                }
            }
        )
    }

    static associate(models){
        this.hasMany(models.Employee)
    }

}

export default Department