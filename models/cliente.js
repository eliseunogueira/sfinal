/**
 * Service Provider's custumer (Clientes do prestador de serviços)
 * @param {*} sequelize
 * @param {*} DataTypes
 */
module.exports = (sequelize, DataTypes) => {
  var Cliente = sequelize.define(
    'cliente',
    {
      nome: DataTypes.STRING,
      cnpj: DataTypes.STRING,
      responsavel: DataTypes.STRING,
      email_1: DataTypes.STRING,
      email_2: DataTypes.STRING,
      telefone: DataTypes.STRING,
    },
    {},
  );
  Cliente.associate = function(models) {
    Cliente.hasMany(models.endereco);
    Cliente.hasMany(models.equipamento);
    Cliente.belongsTo(models.usuario);
  };
  return Cliente;
};
