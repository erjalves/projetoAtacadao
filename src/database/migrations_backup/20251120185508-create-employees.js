'use strict';

import {QueryInterface,Sequelize} from 'sequelize'

export default{
  async up (queryInterface, Sequelize) {
    
     await queryInterface.createTable('employees', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },

      registration_number:{
        type: Sequelize.STRING,
        allowNull: false,
      },

      first_name:{
        type: Sequelize.STRING,
        allowNull: false,
      },

      last_name:{
        type: Sequelize.STRING,
        allowNull: false,
      },

      created_at:{
        type: Sequelize.DATE,
        allowNull: false
      },

      updated_at:{
        type: Sequelize.DATE,
        allowNull: false
      },

      status:{
        type: Sequelize.STRING,
        allowNull: false
      },

      role_id:{
        type: Sequelize.INTEGER,
        allowNull: false,

        references: {
          model: 'roles',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },

      branch_id:{
        type: Sequelize.INTEGER,
        allowNull: false,

        references: {
          model: 'branchs',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },

    })
     
  },

  async down (queryInterface) {
    
     await queryInterface.dropTable('employees');
     
  }
};
