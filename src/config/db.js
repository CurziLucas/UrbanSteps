const mongoose = require('mongoose');

// Configuración de la conexión
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/tu-base-de-datos', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        
        console.log('Conectado a MongoDB');
    } catch (error) {
        console.error('Error al conectar con MongoDB:', error);
        process.exit(1);
    }
};

module.exports = { connectDB };