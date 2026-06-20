import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('✅ DB Connected');
    } catch (error) {
        console.log('❌ Ошибка подключения к БД:');
        console.log(error.message);
        process.exit(1);
    }
};

export default connectDB;