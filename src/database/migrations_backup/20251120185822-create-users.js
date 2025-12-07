'use strict';

import {QueryInterface,Sequelize} from 'sequelize'

export default{
  async up (queryInterface, Sequelize) {
    
     await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },

      username:{
        type: Sequelize.STRING,
        allowNull: false,
      },

      password_hash:{
        type: Sequelize.STRING,
        allowNull: false,
      },

      profile_picture:{
        type: Sequelize.STRING,
        allowNull: true,
      },

      email:{
        type: Sequelize.STRING,
        allowNull: false,
      },

      phone_number:{
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

      last_login:{
        type: Sequelize.DATE,
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

    })
     
  },

  async down (queryInterface) {
    
     await queryInterface.dropTable('users');
     
  }
};
