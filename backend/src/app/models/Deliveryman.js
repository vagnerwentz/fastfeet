import Sequelize, { Model } from 'sequelize';

class Deliveryman extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                email: Sequelize.STRING,
                num_pickup: Sequelize.INTEGER,
            },
            {
                sequelize,
            }
        );

        return this;
    }

    // Relacionando o User com o File
    static associate(models) {
        // belongsTo => Tipo de relacionamento => PERTENCE A
        // o model de deliveryman pertence a um model de file
        this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
    }
}

export default Deliveryman;
