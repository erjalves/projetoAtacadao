'use strict';

import {Model, QueryInterface,Sequelize} from 'sequelize'

export default{
  async up (queryInterface, Sequelize) {
    
     await queryInterface.createTable('city_subroutes', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },

      priority:{
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      subroute_id:{
        type: Sequelize.INTEGER,
        allowNull: false,

        references: {
          model: 'subroutes',
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

      city_id:{
        type: Sequelize.INTEGER,
        allowNull: false,

        references: {
          model: 'cities',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },

      created_at:{
        type: Sequelize.DATE,
        allowNull: false
      }  

    })
     
  },

  async down (queryInterface) {
    
     await queryInterface.dropTable('city_subroutes');
     
  }
};
