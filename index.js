const { ApolloServer, gql } = require('apollo-server');


//data
const cursos = [
    {
        titulo: 'JavaScript Moderno Guía Definitiva Construye +10 Proyectos',
        tecnologia: 'JavaScript ES6',
    },
    {
        titulo: 'React – La Guía Completa: Hooks Context Redux MERN +15 Apps',
        tecnologia: 'React',
    },
    {
        titulo: 'Node.js – Bootcamp Desarrollo Web inc. MVC y REST API’s',
        tecnologia: 'Node.js'
    }, 
    {
        titulo: 'ReactJS Avanzado – FullStack React GraphQL y Apollo',
        tecnologia: 'React'
    }
]

//Schema
const typeDefs = gql`

    type Curso {
        titulo: String
        tecnologia: String
    }
    type Tecnologia {
        tecnologia: String 
    }

    type Query {
        obtenerCurso: [Curso]
        obtenerTecnologia: [Tecnologia]
    }

`;

//Resolvers
const resolvers = {
    Query:{
        obtenerCursos: () => cursos,
        obtenerTecnologia: () => cursos

    }

}


//server
const server = new ApolloServer({
    typeDefs,
    resolvers

});


// 
server.listen().then( ({url}) => {
    console.log(`Server is running on url ${url}`)
})