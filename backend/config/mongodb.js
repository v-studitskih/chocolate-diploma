import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const connectDB = async () => {
    try {
        // Просто заменяем путь к сертификату на абсолютный
        const certPath = path.join(__dirname, '..', 'root.crt');
        const mongoUrl = process.env.MONGODB_URL.replace(
            'tlsCAFile=./root.crt',
            `tlsCAFile=${certPath}`
        );
        
        await mongoose.connect(mongoUrl);
        console.log('✅ DB Connected');
    } catch (error) {
        console.log('❌ Ошибка подключения к БД:');
        console.log(error.message);
        process.exit(1);
    }
};

export default connectDB;