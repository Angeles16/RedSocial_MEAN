'use strict'

import jwt from 'jwt-simple';
import moment from 'moment';
import express, {Request, Response} from 'express';


const secret = 'clave_cecreta_analisis2_red_social';
//asegurar la autenticacion

exports.ensureAuth = function (req, res, next){
    const token = req.headers["authorization"]
    console.log('TOKEN ==> ' + token);
    if(!token){
        return res.status(403).send({ message: 'La peticion no tiene la cabecera de autenticacion'});
    }

    const tokenRep = token.replace(/['"]+/g, ''); //almacenar token en una varaible y limiarlo de comias 

    try{
        const payload = jwt.decode(token, secret); // Decodificar el token
        
        if(payload.exp <= moment().unix()){ //validar fecha de expiracion token
            return res.status(401).send({ message: 'El token a expirado'});
        }
    } catch(ex){
        return res.status(404).send({ message: ' El token no es valido'});
    }
    req.user = this.payload;//cargar todos los datos a la variable user del recuest
    next();
}


