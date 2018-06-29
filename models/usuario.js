'use strict';
module.exports = (sequelize, DataTypes) => {
  var Usuario = sequelize.define(
    'usuario',
    {
      username: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isAlphanumeric: {
            args: true,
            msg: 'Usuario Somente pode conter letras',
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: {
            args: true,
            msg: 'e-mail invalido',
          },
        },
      },
      password: DataTypes.STRING,
      jwt: DataTypes.STRING,
      isAdmin: DataTypes.BOOLEAN,
    },
    { timestamps: false },
  );
  Usuario.associate = function(models) {};
  return Usuario;
};
