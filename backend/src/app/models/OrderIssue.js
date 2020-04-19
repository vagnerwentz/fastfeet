import Sequelize, { Model } from 'sequelize';

class OrderIssue extends Model {
    static init(sequelize) {
        super.init(
            {
                description: Sequelize.STRING,
            },
            {
                sequelize,
                tableName: 'orders_issues',
            }
        );
        return this;
    }

    static associate(models) {
        this.belongsTo(models.Order, {
            foreignKey: 'order_id',
            as: 'order',
        });
    }
}

export default OrderIssue;
