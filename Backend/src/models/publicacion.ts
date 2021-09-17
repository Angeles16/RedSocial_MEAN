import mongoose from 'mongoose';

const { Schema } = mongoose;

const PublicacionSchema = new Schema({
    texto: String, 
    fichero: String, 
    created_at: String,
    user: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Publicacion', PublicacionSchema);