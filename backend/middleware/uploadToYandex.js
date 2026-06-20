import { PutObjectCommand } from "@aws-sdk/client-s3";
import s3 from "../config/yandex-storage.js";
import path from "path";

const uploadToYandex = async (file, folder = 'products') => {
    try {
        if (!file) {
            throw new Error('Файл не предоставлен');
        }

        const timestamp = Date.now();
        const random = Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        const fileName = `${timestamp}-${random}${ext}`;
        const key = `${folder}/${fileName}`;

        const command = new PutObjectCommand({
            Bucket: process.env.YANDEX_BUCKET_NAME,
            Key: key,
            Body: file.buffer,
            ContentType: file.mimetype,
            ACL: 'public-read',
        });

        await s3.send(command);

        const fileUrl = `https://storage.yandexcloud.net/${process.env.YANDEX_BUCKET_NAME}/${key}`;

        return {
            success: true,
            url: fileUrl,
            key: key,
            fileName: fileName
        };
    } catch (error) {
        console.error('Ошибка загрузки в Яндекс Облако:', error);
        throw error;
    }
};

export default uploadToYandex;