const cursos = require('./db/data')

//Resolvers
const resolvers = {
    Query:{
        obtenerCursos: () => cursos,
        //                      _, <- es el que tiene el resultado de un resolver padre (consultas anidados)
        //                       input <-           
        //                       ctx <- constest se comparte entre los resolvers por ejemplo una autenticacion
        //                       info <- contiene informacion sobre la consulta actual                             
        obtenerCursosPorTitulo: (_,{input},ctx, info ) => {
                const resultado = cursos.filter(curso => curso.tecnologia === input.tecnologia);

                return resultado;
        },

    }

}
module.exports= resolvers;