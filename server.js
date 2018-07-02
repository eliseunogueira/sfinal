const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const schema = require('./data/schema');
const jwt = require('express-jwt');
const cors = require('cors');
const jsonwebtoken = require('jsonwebtoken');
const enviaEmail = require('./enviaEmail');
const { certificado } = require('./models');

require('dotenv').config();

//check token
const auth = jwt({
  secret: process.env.JWT_SECRET,
  credentialsRequired: false,
});

// create a server
const app = express();
const PORT = 8081;

app.use(cors());

const addUser = async (req, res, next) => {
  try {
    const token = await req.headers.token;
    const { user } = jsonwebtoken.verify(
      token,
      process.env.JWT_SECRET,
      function(err, decoded) {
        req.user = decoded;
      },
    );
  } catch (error) {}

  next();
};

app.use(addUser);

// graphql endpoint
app.use(
  '/api',
  bodyParser.json(),
  auth,
  graphqlExpress((req) => ({
    schema,
    context: {
      user: req.user,
    },
  })),
);
app.get('/graphiql', graphiqlExpress({ endpointURL: '/api' })); // if you want GraphiQL enabled
app.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${PORT}/api`);
});

app.get('/aprovado/:token', async (req, res) => {
  try {
    const certificadotoken = await jsonwebtoken.verify(
      req.params.token,
      process.env.CERT_SECRET,
    );
    const certificadoAtualizado = await certificado.findById(
      certificadotoken.certificadoId,
    );
    if (certificadoAtualizado.travado === null) {
      certificadoAtualizado.travado = true;
      certificadoAtualizado.status = 'Aprovado';
      certificadoAtualizado.save();
      res.send('Aprovado com sucesso');
    } else {
      res.send('Certificado Travado');
    }
  } catch (e) {
    res.send('Não foi possivel atualizar o status');
  }
});

app.get('/reprovado/:token', async (req, res) => {
  try {
    const certificadotoken = await jsonwebtoken.verify(
      req.params.token,
      process.env.CERT_SECRET,
    );
    const certificadoAtualizado = await certificado.findById(
      certificadotoken.certificadoId,
    );
    if (certificadoAtualizado.travado === null) {
      certificadoAtualizado.travado = true;
      certificadoAtualizado.status = 'Reprovado';
      certificadoAtualizado.save();
      res.send('Reprovado');
    } else {
      res.send('Certificado Travado');
    }
  } catch (e) {
    res.send('Não foi possivel atualizar o status');
  }
});
