import { PrismaClient } from '@prisma/client';

// Тип для глобального хранения Prisma
type GlobalPrisma = {
    prisma: PrismaClient;
};

// Инициализация глобальной переменной
const globalForPrisma = globalThis as unknown as GlobalPrisma;

// Функция создания и настройки Prisma Client
const createPrismaClient = (): PrismaClient => {
    const client = new PrismaClient({
        log:
            process.env.NODE_ENV === 'development'
                ? ['info', 'warn', 'error']
                : ['warn', 'error'],
    });

    // Обработка graceful shutdown
    process.on('beforeExit', async () => {
        await client.$disconnect();
    });

    return client;
};

// Инициализация или получение существующего экземпляра
export const prisma = globalForPrisma.prisma || createPrismaClient();

// Сохранение в globalThis для Hot Reload в development
if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma;
}
