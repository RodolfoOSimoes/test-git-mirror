import { createConnection } from 'typeorm';

let connection: any = null;

export async function openConnection(): Promise<void> {
  connection = await createConnection({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [__dirname + '/../**/*.entity{.js}'],
    synchronize: false,
    logging: ['error'],
    extra: {
      connectionLimit: 20,
    },
  });
}

export function getConnection(): any {
  return connection;
}
