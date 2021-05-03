const Usuario = require('./models/Usuarios');
const Producto = require('./models/Producto');
const Cliente = require('./models/Cliente');
const Pedido = require('./models/Pedido');
const bcryptjs = require('bcryptjs');
const jwt =  require('jsonwebtoken');
require('dotenv').config({ path: 'variables.env' });

const crearToken = (usuario, secreta, expiresIn) =>{
    console.log(usuario)
    const {id, email, nombre, apellido } = usuario;

    return jwt.sign({ id, email, nombre, apellido  }, secreta , { expiresIn})
}

//Resolvers
const resolvers = {
    Query:{
        obtenerUsuario: async (_,{ token }) => {
            const usuarioId = await jwt.verify(token, process.env.SECRETA)

            return usuarioId;
        },
        obtenerProductos: async () => {
            try {
                const productos = await  Producto.find({});

                return productos;
            } catch (error) {
                console.log(error)
            }
        },
        obtenerProducto: async (_, { id }) => {
            try {
                const producto = await  Producto.findById(id);

                if(!producto){
                    throw new Error('Producto no encontrado');
                }

                return producto;
            } catch (error) {
                console.log(error)
            }
        },
        obtenerCliente: async (_, { id }, ctx) => {
            try {
                const cliente = await  Cliente.findById(id);

                if(!cliente){
                    throw new Error('cliente no encontrado');
                }

                if(cliente.vendedor.toString() !== ctx.usuario.id){
                    throw new Error('No tienes las credenciales');
                }

                return cliente;
            } catch (error) {
                console.log(error)
            }
        },
        obtenerClientes: async () => {
            try {
                const clientes = await  Cliente.find({});

                return clientes;
            
            } catch (error) {
                console.log(error)
            }
        },
        obtenerClientesVendedor: async (_, { }, ctx) => {
            try {
                const clientes = await  Cliente.find({vendedor: ctx.usuario.id.toString() });

                return clientes;

            } catch (error) {
                console.log(error)
            }
        },
        
    },
    Mutation: {
        nuevoUsuario: async (_,{ input }) => {
            const {email, password} = input;

            const existeUsuario = await Usuario.findOne({email});
            if (existeUsuario){
                throw new Error('Ya existe un usuario con este email ',email)
            }

            const salt = await bcryptjs.getSalt(10);
            input.password = await bcryptjs.hash(password, salt);

            try {
                const usuario = new Usuario(input);
                usuario.save();
                return usuario;
            } catch (error) {
                console.log(error)
            }

        },
        autenticarUsuario: async (_, { input } ) =>{
            const { email, password } = input;

            const existeUsuario = await Usuario.findOne({ email });
            if(!existeUsuario){
                throw new Error('El usuario no existe');
            }
            const passwordCorrecto = await bcryptjs.compare(password, existeUsuario.password);
            
            if(!passwordCorrecto){
                throw new Error('Password or email incorrectos');
            }

            return {
                token: crearToken(existeUsuario, process.env.SECRETA, '24h' )
            }

        },
        nuevoProducto: async (_, { input }) => {
            try {
                const producto = new Producto(input);
                const resultado= await producto.save();

                const resultado;
            } catch (error) {
                console.log(error)
            }
        },
        actualizarProducto: async (_, { id, input} )=> {

            let producto = await Producto.findById(id);
            if(!producto){
                throw new Error('Producto no encontrado');
            }
            producto = await Producto.findOneAndUpdate({_id:id}, input, {new:true});
            return producto;

        },
        eliminarProducto: async(_, { id})=>{
            let producto = await Producto.findById(id);
            if(!producto){
                throw new Error('Producto no encontrado');
            }
            await Producto.findOneAndDelete({_id:id});
            return "Producto eliminado";

        },
        nuevoCliente :  async(_, { input}, ctx)=>{
            const {email} = input;
            const cliente = await Cliente.findOne({email});
            if(!cliente){
                throw new Error('Ya existe un cleinte con ese email');
            }

            const nuevoCliente = new Cliente(input);
            nuevoCliente.vendedor = ctx.usuario.id;

            try {
                const resultado = await nuevoCliente.save()
    
                return resultado;
                
            } catch (error) {
                console.log(`Sucedio un error ${error}`)                
            }
        },
        actualizarCliente: async (_, { id, input}, ctx )=> {

            let cliente = await Cliente.findById(id);
           
            if(!cliente){
                throw new Error('cliente no encontrado');
            }
            if(cliente.vendedor.toString() !== ctx.usuario.id){
                throw new Error('No tienes las credenciales');
            }

            cliente = await Cliente.findOneAndUpdate({_id:id}, input, {new:true});
            return cliente;
        },
        eliminarCliente: async(_, { id}, ctx)=>{
            let cliente = await Cliente.findById(id);
            if(!cliente){
                throw new Error('cliente no encontrado');
            }
            if(cliente.vendedor.toString() !== ctx.usuario.id){
                throw new Error('No tienes las credenciales');
            }

            await Cliente.findOneAndDelete({_id:id});
            return "Producto eliminado";

        }, 
        nuevoPedido :  async(_, { input}, ctx)=>{
           
            const { cliente } = input

            let clienteExiste = await Cliente.findById(cliente)
            
            if(!clienteExiste){
                throw new Error("Cliente no existe");
            }

            if(clienteExiste.vendedor.toString() !== ctx.usuario.id){
                throw new Error("No tienes las credenciales");
            }

            for await (const articulo of input.pedido){
                const [id] = articulo;
                const producto = await Producto.findById(id);
                
                if(articulo.cantidad > producto.existencia) {
                    throw new Error(`El producto: ${producto.nombre} excede la cantidad disponible`);
                }else{
                    producto.existencia = producto.existencia - articulo.cantidad;
                    await producto.save();
                }
            }

            const nuevoPedido = new Pedido(input);
            
            nuevoPedido.vendedor = ctx.usuario.id;

            const resultado = await nuevoPedido.save();

            return resultado;

        },
    }

}
module.exports= resolvers;