const { equipamento } = require('../../models');
module.exports = {
  equipamento,
  async getequipamentos(_, args, { user }, info) {
    if (!user) {
      throw new Error('Você não esta logado');
    }
    return await equipamento.findAll();
  },
  async getequipamento(_, { id }, { user }, info) {
    if (!user) {
      throw new Error('Você não esta logado');
    }
    return await equipamento.findById(id);
  },
  async addEquipamentoMutation(_, args, { user }, info) {
    try {
      return await equipamento.create(args);
    } catch (e) {
      console.log(e.message);
      throw new Error(e);
    }
  },
};
