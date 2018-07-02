const { cliente } = require('../../models');
module.exports = {
  cliente,
  async getcliente(_, { id }, { user }, info) {
    if (!user) {
      throw new Error('Você não esta logado');
    }
    return await cliente.findById(id);
  },
  async getclientes(_, args, { user }, info) {
    if (!user) {
      throw new Error('Você não esta logado');
    }
    return await cliente.findAll({ where: { usuarioId: user.id } });
  },
  async addClienteMutation(_, args, { user }, info) {
    try {
      return await cliente.create(args);
    } catch (e) {
      throw new Error('Não gravou');
    }
  },
};
