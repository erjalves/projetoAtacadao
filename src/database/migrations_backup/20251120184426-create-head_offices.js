'use strict';

import {QueryInterface,Sequelize} from 'sequelize'

export default{
  async up (queryInterface, Sequelize) {
    
     await queryInterface.createTable('head_offices', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },

      name:{
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
      }

    })
     
  },

  async down (queryInterface) {
    
     await queryInterface.dropTable('head_offices');
     
  }
};
