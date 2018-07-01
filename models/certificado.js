/**
 * Service Provider's custumer (Clientes do prestador de serviços)
 * @param {*} sequelize
 * @param {*} DataTypes
 */
module.exports = (sequelize, DataTypes) => {
  var Certificado = sequelize.define(
    'certificado',
    {
      nome: DataTypes.STRING,
      padrao: DataTypes.TEXT,
      ambiente: DataTypes.STRING,
      observacao: DataTypes.TEXT,
      data: DataTypes.DATE,
      nome_ap: DataTypes.STRING,
      email_ap: DataTypes.STRING,
      status: DataTypes.STRING,
      arquivo: DataTypes.STRING,
    },
    {},
  );
  Certificado.associate = function(models) {
    Certificado.belongsTo(models.usuario);
  };
  return Certificado;
};
