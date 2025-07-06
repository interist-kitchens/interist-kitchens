import {
    DeleteObjectCommand,
    PutObjectCommand,
    S3Client,
    S3ServiceException,
} from '@aws-sdk/client-s3';

export const s3Client = new S3Client({
    endpoint:
        process.env.NEXT_PUBLIC_S3_ENDPOINT ||
        'https://s3.ru1.storage.beget.cloud',
    region: 'ru-1',
    credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY ?? '',
        secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_KEY ?? '',
    },
    forcePathStyle: true,
});

// Поддерживаемые типы файлов
const ALLOWED_MIME_TYPES = [
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/gif',
    'image/svg+xml',
];

// Максимальный размер файла (5MB)
const MAX_FILE_SIZE = 5 * 1024 * 1024;

interface UploadResult {
    url: string;
    key: string;
}

export async function uploadToS3(
    bucket: string,
    file: Blob,
    originalFilename: string
): Promise<UploadResult> {
    // Проверка типа файла
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
        throw new Error(`Неподдерживаемый тип файла: ${file.type}`);
    }

    // Проверка размера файла
    if (file.size > MAX_FILE_SIZE) {
        throw new Error(
            `Файл слишком большой. Максимальный размер: ${MAX_FILE_SIZE / 1024 / 1024}MB`
        );
    }

    // Генерация уникального имени файла
    const fileExtension = originalFilename.split('.').pop();
    const uniqueName = `${crypto.randomUUID()}.${fileExtension}`;
    const key = `uploads/${uniqueName}`;

    try {
        const command = new PutObjectCommand({
            Bucket: bucket,
            Key: key,
            Body: Buffer.from(await file.arrayBuffer()),
            ACL: 'public-read',
            ContentType: file.type,
        });

        await s3Client.send(command);

        return {
            url: `https://${bucket}.s3.ru1.storage.beget.cloud/${key}`,
            key,
        };
    } catch (error) {
        if (error instanceof S3ServiceException) {
            console.error('S3 Error:', error.$metadata);
            throw new Error(`Ошибка загрузки файла: ${error.message}`);
        }
        throw error;
    }
}

export async function deleteFromS3(bucket: string, key: string) {
    try {
        const command = new DeleteObjectCommand({
            Bucket: bucket,
            Key: key,
        });

        await s3Client.send(command);
    } catch (error) {
        // Не прерываем выполнение, если не удалось удалить файл
        console.error('Error deleting file from S3:', error);
    }
}
