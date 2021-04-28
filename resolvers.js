const cursos = require('./db/data')

//Resolvers
const resolvers = {
    Query:{
        obtenerCursos: () => cursos,
        obtenerTecnologia: () => cursos

    }

}
module.exports= resolvers;