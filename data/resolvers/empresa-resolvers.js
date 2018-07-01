const { empresa } = require('../../models');
module.exports = {
  empresa,
  async getempresa(_, { id }, { user }, info) {
    if (!user) {
      throw new Error('Você não esta logado');
    }
    return await empresa.findById(id);
  },
  async getempresas(_, args, { user }, info) {
    if (!user) {
      throw new Error('Você não esta logado');
    }
    return await empresa.findAll();
  },
  async addEmpresaMutation(_, args, { user }, info) {
    try {
      return await empresa.create(args);
    } catch (e) {
      throw new Error('Não gravou');
    }
  },
};
