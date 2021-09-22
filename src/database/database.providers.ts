import { createConnection } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () =>
      await createConnection({
        type: 'mysql',
        host: 'f429klen0n10vvrx.cbetxkdyhwsb.us-east-1.rds.amazonaws.com', //process.env.DB_HOST,
        port: 3306,
        username: 'tb60powkvrg1ptfn', //process.env.DB_USER,
        password: 'knv9cbqux70omrm3', //process.env.DB_PASS,
        database: 'w9a8xpy6biprbkvf', //process.env.DB_NAME,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: false,
        logging: ['error'],
        extra: {
          connectionLimit: 2,
        },
      }),
  },
];
