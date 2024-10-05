

import { AppDataSource } from '@/config/typeorm.config';

export const initializeDataSource = async () => {
    if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
    }
};
