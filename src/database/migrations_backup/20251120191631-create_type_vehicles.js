'use strict';

import {QueryInterface,Sequelize} from 'sequelize'

export default{
  async up (queryInterface, Sequelize) {
    
     await queryInterface.createTable('type_vehicles', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },

      description:{
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
    
     await queryInterface.dropTable('type_vehicles');
     
  }
};
