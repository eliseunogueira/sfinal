const { usuario } = require('../../models');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const formatErrors = require('../../formatErrors');
require('dotenv').config();

module.exports = {
  usuario,
  async getme(_, args, { user }) {
    if (!user) {
      throw new Error('Você não esta logado');
    }
    try {
      return await usuario.findById(user.id);
    } catch (e) {
      throw new Error('Usuario não encontrado');
    }
  },
  async getusuarios(_, args, { user }, info) {
    if (!user) {
      throw new Error('Você não esta logado');
    }
    return await usuario.findAll();
  },
  async getusuario(_, { id }, { user }, info) {
    if (!user) {
      throw new Error('Você não esta logado');
    }
    return await usuario.findById(id);
  },
  async signup(_, { username, email, password }) {
    const existingUser = await usuario.findOne({ where: { email } });
    if (existingUser) {
      throw new Error('Email já esta cadastrado');
    }
    try {
      const user = await usuario.create({
        username,
        email,
        password: await bcrypt.hash(password, 10),
      });

      usuario.findOne({ where: { email } }).then((person) => {
        person.jwt = jsonwebtoken.sign(
          { id: person.id, email: person.email },
          process.env.JWT_SECRET,
        );
        return person.save();
      });

      return { ok: true, usuario: user };
    } catch (error) {
      return {
        ok: false,
        errors: formatErrors(error, usuario),
      };
    }
  },
  async login(_, { email, password }) {
    try {
      const user = await usuario.findOne({ where: { email } });

      if (!user) {
        throw new Error('Nenhum User com este email');
      }
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        throw new Error('Senha incorreta');
      }

      return { ok: true, usuario: user };
    } catch (error) {
      return { ok: false, errors: formatErrors(error, usuario) };
    }
  },
};
