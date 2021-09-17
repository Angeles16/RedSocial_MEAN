import mongoose, { model } from "mongoose";

const { Schema } = mongoose;

const AmigosSchema = new Schema({
    usuario: {type: Schema.Types.ObjectId, ref: 'User'},
    amigo: {type: Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Amigo', AmigosSchema);