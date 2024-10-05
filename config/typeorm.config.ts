import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.SQL_HOST,
    port: 3306,
    username: process.env.SQL_USER,
    password: process.env.SQL_PASS,
    database: process.env.SQL_DB,
    synchronize: false,
    logging: false,
    entities: ['entities/*.ts'],
});
