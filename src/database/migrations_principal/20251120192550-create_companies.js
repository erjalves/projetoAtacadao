'use strict';

import {QueryInterface,Sequelize} from 'sequelize'

export default{
  async up (queryInterface, Sequelize) {
    
     await queryInterface.createTable('companies', {
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
    
     await queryInterface.dropTable('companies');
     
  }
};
