'use strict';

import {QueryInterface,Sequelize} from 'sequelize'

export default{
  async up (queryInterface, Sequelize) {
    
     await queryInterface.createTable('branchs', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },

      code:{
        type: Sequelize.STRING,
        allowNull: false,
      },

      name:{
        type: Sequelize.STRING,
        allowNull: false,
      },

      manager:{
        type: Sequelize.STRING,
        allowNull: false,
      },

      operation_superviror:{
        type: Sequelize.STRING,
        allowNull: false,
      },

      administrative_supervisor:{
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

      head_office_id:{
        type: Sequelize.INTEGER,
        allowNull: false,

        references: {
          model: 'head_offices',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },

    })
     
  },

  async down (queryInterface) {
    
     await queryInterface.dropTable('branchs');
     
  }
};
