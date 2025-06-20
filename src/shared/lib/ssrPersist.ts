import { fork, serialize, Store } from 'effector';

// Конфигурация отдельного стора
interface StoreConfig<T> {
    store: Store<T>; // Сам стор
    key: string; // Ключ для сохранения в localStorage
    defaultValue: T; // Значение по умолчанию
}

// Параметры для инициализации нескольких сторов
interface InitializeMultiSsrPersistParams {
    stores: StoreConfig<any>[]; // Массив конфигураций сторов
    forkParams?: {
        // Дополнительные параметры для fork()
        values?: [Store<any>, any][]; // Дополнительные начальные значения
        handlers?: [Store<any>, (value: any) => any][]; // Обработчики
    };
}

/**
 * Инициализирует несколько сторов с поддержкой SSR и сохранением в localStorage
 *
 * @example
 * const { scope, values } = initializeMultiSsrPersist({
 *   stores: [
 *     { store: $cart, key: 'cart', defaultValue: [] },
 *     { store: $user, key: 'user', defaultValue: null }
 *   ]
 * });
 */
export function initializeMultiSsrPersist({
    stores,
    forkParams = {},
}: InitializeMultiSsrPersistParams) {
    // Подготовка начальных значений
    const initialValues: [Store<any>, any][] = [];

    // Обработка каждого стора
    stores.forEach(({ store, key, defaultValue }) => {
        // Получаем начальное состояние (только на клиенте)
        const initialState =
            typeof window !== 'undefined'
                ? safelyGetFromLocalStorage(key, defaultValue) // Безопасное чтение из localStorage
                : defaultValue; // На сервере - значение по умолчанию

        initialValues.push([store, initialState]);

        // Настройка сохранения в localStorage (только на клиенте)
        if (typeof window !== 'undefined') {
            import('effector-storage/local').then(({ persist }) => {
                persist({
                    store,
                    key,
                    sync: false, // Отключаем синхронную загрузку во избежание конфликтов
                });
            });
        }
    });

    // Объединяем с дополнительными параметрами
    const allValues = [...initialValues, ...(forkParams.values || [])];

    // Создаем scope со всеми сторами
    const scope = fork({
        values: allValues, // Начальные значения
        handlers: forkParams.handlers || [], // Обработчики
    });

    // Сериализуем для гидратации на клиенте
    const serializedValues = serialize(scope);

    return { scope, values: serializedValues };
}

/**
 * Безопасное чтение из localStorage
 * @param key Ключ в localStorage
 * @param defaultValue Значение по умолчанию при ошибке
 */
function safelyGetFromLocalStorage<T>(key: string, defaultValue: T): T {
    try {
        const stored = localStorage.getItem(key);
        return stored ? JSON.parse(stored) : defaultValue;
    } catch (e) {
        console.warn(`Ошибка при чтении ${key} из localStorage`, e);
        return defaultValue;
    }
}
