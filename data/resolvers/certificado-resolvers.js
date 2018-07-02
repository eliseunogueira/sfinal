const { certificado } = require('../../models');
const enviaEmail = require('../../enviaEmail');

module.exports = {
  certificado,
  async getcertificado(_, { id }, { user }, info) {
    if (!user) {
      throw new Error('Você não esta logado');
    }
    return await certificado.findById(id);
  },
  async getcertificados(_, args, { user }, info) {
    if (!user) {
      throw new Error('Você não esta logado');
    }
    return await certificado.findAll({ where: { usuarioId: user.id } });
  },
  async addCertificadoMutation(_, args, { user }, info) {
    try {
      let temp = await certificado.create(args);
      enviaEmail(temp.id, temp.email_ap);
      return temp;
    } catch (e) {
      console.log(e.message);
      throw new Error(e);
    }
  },
  async removeCertificado(_, args) {
    try {
      await certificado.destroy({
        where: { id: args.id },
      });
      return {
        message: 'Deletado com sucesso',
      };
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async novatemtativaEmail(_, args) {
    try {
      let temp = await certificado.findById(args.id);
      enviaEmail(temp.id, temp.email_ap);
      return temp;
    } catch (e) {
      console.log(e.message);
      throw new Error(e);
    }
  },
};
