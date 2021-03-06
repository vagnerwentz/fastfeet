module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('orders_issues', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            order_id: {
                type: Sequelize.INTEGER,
                references: { model: 'orders', key: 'id' },
                onUpdate: 'SET NULL',
                onDelete: 'SET NULL',
                allowNull: true,
            },
            description: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
        });
    },

    down: queryInterface => {
        return queryInterface.dropTable('orders_issues');
    },
};
