import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema({
    nombre: String, 
    apellido: String, 
    nick: String, 
    email: String, 
    password: String, 
    roles: String, 
    imagenes: String
});

module.exports = mongoose.model('User', UserSchema);