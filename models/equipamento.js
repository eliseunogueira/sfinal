/**
 * Service Provider's custumer (Produtos dos Clientes)
 * @param {*} sequelize
 * @param {*} DataTypes
 */
module.exports = (sequelize, DataTypes) => {
  var Equipamento = sequelize.define(
    'equipamento',
    {
      nome: DataTypes.STRING,
      fabricante: DataTypes.STRING,
      modelo: DataTypes.STRING,
      nserie: DataTypes.STRING,
      responsavel: DataTypes.STRING,
      email_responsavel: DataTypes.STRING,
      localizacao: DataTypes.STRING,
      parametros: DataTypes.STRING,
      ensaio: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    { timestamps: false },
    {},
  );
  Equipamento.associate = function(models) {
    Equipamento.hasMany(models.certificado);
    Equipamento.belongsTo(models.usuario);
  };
  return Equipamento;
};
