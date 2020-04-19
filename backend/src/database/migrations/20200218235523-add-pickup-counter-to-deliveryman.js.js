module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('deliverymans', 'num_pickup', {
            type: Sequelize.INTEGER,
            defaultValue: 0,
            allowNull: true,
        });
    },

    down: queryInterface => {
        return queryInterface.removeColumn('deliverymans', 'num_pickup');
    },
};
