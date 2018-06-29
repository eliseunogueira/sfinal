const fs = require('fs');
const path = require('path');
const { makeExecutableSchema } = require('graphql-tools');
const resolvers = require('./resolvers');

const schemaFile = path.join(__dirname, 'schema.graphql');
// Define the schema using the Graphql schema language
const typeDefs = fs.readFileSync(schemaFile, 'utf8');
module.exports = makeExecutableSchema({ typeDefs, resolvers });
