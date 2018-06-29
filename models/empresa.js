/**
 * Service Provider (Prestadores de serviços)
 * @param {*} sequelize
 * @param {*} DataTypes
 */
module.exports = (sequelize, DataTypes) => {
    var Empresa = sequelize.define(
        'empresa',
        {
            nome: DataTypes.STRING,
            cnpj: DataTypes.STRING,
            responsavel: DataTypes.STRING,
            email_1: DataTypes.STRING,
            email_2: DataTypes.STRING,
            telefone: DataTypes.STRING,
        },
        {timestamps: false},
    );
    Empresa.associate = function (models) {
        Empresa.belongsTo(models.usuario);
        Empresa.hasMany(models.endereco);
        Empresa.hasMany(models.cliente);
    };
    return Empresa;
};
