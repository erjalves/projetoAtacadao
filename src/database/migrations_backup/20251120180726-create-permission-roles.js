'use strict';

import {Model, QueryInterface,Sequelize} from 'sequelize'

export default{
  async up (queryInterface, Sequelize) {
    
     await queryInterface.createTable('permission_roles', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
        
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

      permission_id:{
        type: Sequelize.INTEGER,
        allowNull: false,

        references: {
          model: 'permissions',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },

      created_at:{
        type: Sequelize.DATE,
        allowNull: false
      },
      
      updated_at:{
        type: Sequelize.DATE,
        allowNull: false
      }

    })
     
  },

  async down (queryInterface) {
    
     await queryInterface.dropTable('permission_roles');
     
  }
};
