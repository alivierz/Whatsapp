'use strict';

module.exports = {
    async up(queryInterface, DataTypes) {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
        await queryInterface.createTable('participants', {
            id: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true
            },
            conversation_id: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'conversations',
                    key: 'id'
                }
            },
            user_id: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id'
                }
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
            }
        })
        await queryInterface.addConstraint(
            'participants', //nombre de la tabla
            {
                fields: ['id', 'conversation_id', 'user_id'], //columnas que tendran esta restriccion
                type: 'unique', //restriccion para que los valores sean unicos
                name: 'unique_conversation_id_user_id' //nombre para guardar el cambio
            })
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
    }
};