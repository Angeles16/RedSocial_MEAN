import mongoose from 'mongoose';
const { Schema } = mongoose;

const MensageSchema = new Schema({
    text: String, 
    create_at: String, 
    emisor: {type: Schema.Types.ObjectId, ref: 'User'},
    receptor: {type: Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Mensage', MensageSchema);
