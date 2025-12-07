import Sequelize, { Model } from 'sequelize'

class Branch extends Model {
    static init(sequelize) {
        super.init(
            {
                code: {
                    type: Sequelize.STRING,
                    allowNull: false,
                    unique: true
                },

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
                    singular: 'branch',
                    plural: 'branches',
                }
            }
        )
    }

    static associate(models){
        this.hasMany(models.Company)
        this.hasMany(models.Employee)
    }

}

export default Branch