const { gql } = require('apollo-server');

const typeDefs = gql`

    type Curso {
        titulo: String
        tecnologia: String
    }
    input CursoInput {
        tecnologia: String
    }
    type Query {
        obtenerCursos: [Curso]
        obtenerCursosPorTitulo(input: CursoInput!): [Curso]
    }

`;

module.exports = typeDefs;