const {
    usuario,
    equipamento,
    certificado,
    cliente,
    empresa,
} = require('../models');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const formatErrors = require('../formatErrors');
const requiresAuth = require('../permission');
require('dotenv').config();

const resolvers = {
    Query: {
        async me(_, args, {user}) {
            if (!user) {
                throw new Error('Você não esta logado');
            }
            try {
                return await usuario.findById(user.id);
            } catch (e) {
                throw new Error('Usuario não encontrado');
            }

        },
        async usuarios(_, args, {user}, info) {
            if (!user) {
                throw new Error('Você não esta logado');
            }
            return await usuario.findAll();
        },
        async usuario(_, {id}, {user}, info) {
            if (!user) {
                throw new Error('Você não esta logado');
            }
            return await  usuario.findById(id);
        },
        async equipamentos(_, args, {user}, info) {
            if (!user) {
                throw new Error('Você não esta logado');
            }
            return await  equipamento.findAll();
        },
        async equipamento(_, {id}, {user}, info) {
            if (!user) {
                throw new Error('Você não esta logado');
            }
            return await  equipamento.findById(id);
        }, async certificado(_, {id}, {user}, info) {
            if (!user) {
                throw new Error('Você não esta logado');
            }
            return await certificado.findById(id);
        },
        async certificados(_, args, {user}, info) {
            if (!user) {
                throw new Error('Você não esta logado');
            }
            return await  certificado.findAll();
        }, async empresa(_, {id}, {user}, info) {
            if (!user) {
                throw new Error('Você não esta logado');
            }
            return await  empresa.findById(id);
        },
        async empresas(_, args, {user}, info) {
            if (!user) {
                throw new Error('Você não esta logado');
            }
            return await  empresa.findAll();
        },
        async cliente(_, {id}, {user}, info) {
            if (!user) {
                throw new Error('Você não esta logado');
            }
            return await  cliente.findById(id);
        },
        async clientes(_, args, {user}, info) {
            if (!user) {
                throw new Error('Você não esta logado');
            }
            return await  cliente.findAll();
        },

    },
    Mutation: {
        async signup(_, {username, email, password}) {
            const existingUser = await usuario.findOne({where: {email}});
            if (existingUser) {
                throw new Error('Email já esta cadastrado');
            }
            try {
                const user = await usuario.create({
                    username,
                    email,
                    password: await bcrypt.hash(password, 10),
                });

                usuario.findOne({where: {email}}).then((person) => {
                    person.jwt = jsonwebtoken.sign(
                        {id: person.id, email: person.email},
                        process.env.JWT_SECRET,
                    );
                    return person.save();
                });

                return {ok: true, usuario: user};
            } catch (error) {
                return {
                    ok: false,
                    errors: formatErrors(error, usuario),
                };
            }
        },
        async login(_, {email, password}) {
            try {
                const user = await usuario.findOne({where: {email}});
                if (!user) {
                     throw new Error('Nenhum User com este email');
                }
                const valid = await bcrypt.compare(password, user.password);
                if (!valid) {
                     throw new Error('Senha incorreta');
                }

                return {ok: true, usuario: user};
            } catch (error) {
                return {ok: false, errors: formatErrors(error, usuario)};
            }
        },
        async addEmpresaMutation(_,args,{user},info){
            try {
                return await empresa.create(args);
            }catch (e) {
                throw new Error('Não gravou')
            }
        },
        async addClienteMutation(_,args,{user},info){
            try {
                return await cliente.create(args);
            }catch (e) {
                throw new Error('Não gravou')
            }
        },
        async addEquipamentoMutation(_,args,{user},info){
            try {
                return await equipamento.create(args);
            }catch (e) {
                console.log(e.message);
                throw new Error(e)
            }
        },
        async addCertificadoMutation(_,args,{user},info){
            try {
                return await certificado.create(args);
            }catch (e) {
                console.log(e.message);
                throw new Error(e)
            }
        }


    },
};

module.exports = resolvers;
