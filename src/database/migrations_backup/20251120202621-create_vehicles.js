'use strict';

import {QueryInterface,Sequelize} from 'sequelize'

export default{
  async up (queryInterface, Sequelize) {
    
     await queryInterface.createTable('vehicles', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },

      plate:{
        type: Sequelize.STRING,
        allowNull: false,
      },

      crlv:{
        type: Sequelize.STRING,
        allowNull: false,
      },

      crlv_expiration:{
        type: Sequelize.DATE,
        allowNull: false
      },

      insurance_expiration:{
        type: Sequelize.DATE,
        allowNull: false
      },

      max_weight:{
        type: Sequelize.DECIMAL,
        allowNull: false
      },

      max_weight:{
        type: Sequelize.INTEGER,
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

      onwer:{
        type: Sequelize.INTEGER,
        allowNull: false,

        references: {
          model: 'employees',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },

      type_vehicle_id:{
        type: Sequelize.INTEGER,
        allowNull: false,

        references: {
          model: 'type_vehicles',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },

    })
     
  },

  async down (queryInterface) {
    
     await queryInterface.dropTable('vehicles');
     
  }
};
