
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

//Mutaitons
mutaton nuevoUsuario($input : UsuarioInput){
    nuevoUsuario(input: $input){
        id 
        nombre
        apellido
        email
    }
}
---query vairables
{
    "input": {
        "nombre": "Jonathan",
        "apellido": "Ramirez",
        "email": "jona@gmail.com",
        "password": "123456"
    }
}