query {
    obtenerCursos {
        titulo
    }
    obtenerCursosPorTitulo(input: {
        tecnologia: "React"
    }) {
        titulo
    }
}

///usando queries variables

query obtenerCursosPorTitulo($input: CursoInput!){
    obtenerCursosPorTitulo(input: $input){
        titulo
    }
}

------
{
    "input": {
        "tecnologia":"React"
    }
}