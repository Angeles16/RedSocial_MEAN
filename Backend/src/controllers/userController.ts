//modulos
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

//Elementos
const saltRounds = 10;
const controllers = {};

//import archivos internos
const User = require('../models/user');
const jwt = require('../services/jwt');


//ruebas
export async function getHome(req: Request, res: Response): Promise<Response> {

    return res.json({ hola: 'wenas' });
}

//Registrar nuevo usuario 
export async function postSignUp(req: Request, res: Response): Promise<void> {
    const { nombreP, apellidoP, nickP, emailP, passwordP, rolesP, imagenesP } = req.body;
    const params = req.body;
    const user = new User();

    console.log({ 'nombre': nombreP, 'apellido': apellidoP, 'nick': nickP, 'email': emailP, 'password': passwordP });

    if (params.nombre && params.apellido &&
        params.nick && params.email &&
        params.password) {

        user.nombre = params.nombre;
        user.apellido = params.apellido;
        user.nick = params.nick;
        user.email = params.email;
        user.roles = 'ROLE_USER';
        user.imagenes = null;

        //constolar usuarios duplicados 
        await User.find({
            $or: [
                { email: user.email.toLowerCase() },
                { nick: user.nick.toLowerCase() }
            ]
        }).exec((err, users) => {
            if (err) return res.status(500).send({ message: 'Error en la peticion de usuarios' });

            if (user && users.length >= 1) {
                return res.status(200).send({ 'message': 'El usuario que intenta registrar ya existe en la base de datos' });
            } else {

                //cifrar la contraseña y los datos
                bcrypt.hash(params.password, saltRounds, function (err, hash) {
                    user.password = hash;

                    user.save((err, userStore) => {
                        if (err)
                            return res.status(500).send({ message: 'Error al guardar usuario' });

                        if (userStore) {
                            res.status(200).send({ user: userStore });
                        } else {
                            res.status(404).send({ message: 'No se a registrado el usuario' });
                        }
                    });
                }); //fin bcrypt
            }
        })
    } else {
        res.status(200).send({
            message: 'Datos faltantes'
        });
    }
} //fin funtion postUser

//Inicio de secion para usuarios registrados 
export async function postSingIn(req: Request, res: Response):Promise<void> {
    let param = req.body;
    
    let email = param.email;
    let password = param.password;

    User.findOne({ email: email }, function (err, user) {
        if(err) return res.status(500).send({ message: 'Error en la peticion'});
        
        if(user){
            
            bcrypt.compare(password, user.password, function(err, check) {
                if(check){
                    
                    if(param.gettoken){
                        //generar token y devlver token 
                        return res.status(200).send({ 
                            token: jwt.createToken(user)
                        });
                    } else {
                        //devolver datos de usuario
                        user.password = undefined;
                        return res.status(200).send({user})
                    }

                } else {
                    return res.status(404).send({ message: 'El usuario no se a podido logear'})
                }
            });
        } else {
            return res.status(404).send({ message: 'Usuario o contraseña incorrecto'});
        }
    });
}

//obtener un usuario por id
export function getUser(req: Request, res: Response){
    const userId = req.params.id;

    User.findById(userId, (err, user) => {
        if(err) return res.status(500).send({message: 'Error en la peticion'});
        if(!user) return res.status(404).send({message: 'El usuario no exste'});

        return res.status(200).send({user})
    });
}

//Devolver un listado de usuario paginados
function getUsers(req: Request, res: Response){
  const identity = req.user.sub; //ERRROR 

    
}