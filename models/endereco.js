/**
 * Address (Endereço)
 * @param {*} sequelize
 * @param {*} DataTypes
 */
module.exports = (sequelize, DataTypes) => {
  var Endereco = sequelize.define(
    'endereco',
    {
      tipo: DataTypes.STRING,
      line_1: DataTypes.STRING,
      line_2: DataTypes.STRING,
      cidade: DataTypes.STRING,
      estado: DataTypes.STRING,
      cep: DataTypes.STRING,
    },
    { timestamps: false },
  );
  Endereco.associate = function(models) {};
  return Endereco;
};
