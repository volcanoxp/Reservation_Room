'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.createTable('Room', {
          id: {
            type: Sequelize.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
          },
          floor: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false
          },
          code: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
          },
          priceDay: {
            type: Sequelize.DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 40
          },
          isActive: {
            type: Sequelize.DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
          },
          createdAt: {
            type: Sequelize.DataTypes.DATE,
            defaultValue: Sequelize.DataTypes.NOW
          },
          updatedAt: Sequelize.DataTypes.DATE
        }),
        queryInterface.createTable('Reservation', {
          id: {
            type: Sequelize.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
          },
          roomId: {
            type: Sequelize.DataTypes.INTEGER,
            references: {
              model: {
                tableName: 'Room',
                schema: 'public'
              },
              key: 'id'
            },
            allowNull: false
          },
          fullName: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
          },
          identification: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
          },
          email: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
          },
          phone: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
          },
          status: {
            type: Sequelize.DataTypes.ENUM('PENDING','PAID','CANCELED'),
            allowNull: false,
            defaultValue: 'PENDING'
          },
          price: {
            type: Sequelize.DataTypes.FLOAT,
            allowNull: true,
          },
          paymentMethod: {
            type: Sequelize.DataTypes.ENUM('CASH','CARD'),
            allowNull: true,
          },
          days: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false
          },
          initDay: {
            type: Sequelize.DataTypes.DATEONLY,
            allowNull: false
          },
          createdAt: {
            type: Sequelize.DataTypes.DATE,
            defaultValue: Sequelize.DataTypes.NOW
          },
          updatedAt: Sequelize.DataTypes.DATE
        }),
      ]);
    });
  },

  async down (queryInterface, Sequelize) {

  }
};
