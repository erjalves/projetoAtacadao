'use strict';

import {QueryInterface,Sequelize} from 'sequelize'

export default{
  async up (queryInterface, Sequelize) {
    
     await queryInterface.createTable('permissions', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },

      description:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
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
      }

    })
     
  },

  async down (queryInterface) {
    
     await queryInterface.dropTable('permissions');
     
  }
};
