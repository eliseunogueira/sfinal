const GraphQLDate = require('graphql-date');
const Usuario = require('./usuario-resolvers');
const Equipamento = require('../resolvers/equipamento-resolvers');
const Certificado = require('../resolvers/certificado-resolvers');
const Empresa = require('../resolvers/empresa-resolvers');
const Cliente = require('../resolvers/cliente-resolvers');

module.exports = {
  Date: GraphQLDate,
  Equipamento: {
    cliente: ({ clienteId }) => {
      return Cliente.cliente.findById(clienteId);
    },
    usuario: ({ usuarioId }) => {
      return Usuario.usuario.findById(usuarioId);
    },
  },
  Empresa: {
    usuario: ({ usuarioId }) => {
      return Usuario.usuario.findById(usuarioId);
    },
  },
  Certificado: {
    equipamento: ({ equipamentoId }) => {
      return Equipamento.equipamento.findById(equipamentoId);
    },
    usuario: ({ usuarioId }) => {
      return Usuario.usuario.findById(usuarioId);
    },
  },
  Cliente: {
    empresa: ({ empresaId }) => {
      return Empresa.empresa.findById(empresaId);
    },
    usuario: ({ usuarioId }) => {
      return Usuario.usuario.findById(usuarioId);
    },
  },
  Query: {
    me: Usuario.getme,
    usuario: Usuario.getusuario,
    usuarios: Usuario.getusuarios,
    equipamento: Equipamento.getequipamento,
    equipamentos: Equipamento.getequipamentos,
    certificado: Certificado.getcertificado,
    certificados: Certificado.getcertificados,
    empresa: Empresa.getempresa,
    empresas: Empresa.getempresas,
    cliente: Cliente.getcliente,
    clientes: Cliente.getclientes,
  },
  Mutation: {
    addEmpresaMutation: Empresa.addEmpresaMutation,
    addCertificadoMutation: Certificado.addCertificadoMutation,
    addEquipamentoMutation: Equipamento.addEquipamentoMutation,
    addClienteMutation: Cliente.addClienteMutation,
    login: Usuario.login,
    signup: Usuario.signup,
  },
};
