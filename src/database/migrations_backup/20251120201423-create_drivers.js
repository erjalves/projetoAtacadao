'use strict';

import {QueryInterface,Sequelize} from 'sequelize'

export default{
  async up (queryInterface, Sequelize) {
    
     await queryInterface.createTable('drivers', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },

      cpf:{
        type: Sequelize.STRING,
        allowNull: false,
      },

      license:{
        type: Sequelize.STRING,
        allowNull: false,
      },

      license_expiration:{
        type: Sequelize.DATE,
        allowNull: false
      },

      insurance_expiration:{
        type: Sequelize.DATE,
        allowNull: false
      },

      created_at:{
        type: Sequelize.DATE,
        allowNull: false
      },

      updated_at:{
        type: Sequelize.DATE,
        allowNull: false
      },

      owner:{
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      
      status:{
        type: Sequelize.STRING,
        allowNull: false
      },

      employee_id:{
        type: Sequelize.INTEGER,
        allowNull: false,

        references: {
          model: 'employees',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },

      carrier_id:{
        type: Sequelize.INTEGER,
        allowNull: false,

        references: {
          model: 'carriers',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },

      created_by:{
        type: Sequelize.INTEGER,
        allowNull: false,

        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },

    })
     
  },

  async down (queryInterface) {
    
     await queryInterface.dropTable('drivers');
     
  }
};
