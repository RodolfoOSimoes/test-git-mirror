/* eslint-disable @typescript-eslint/no-var-requires */
// import { createConnection } from 'typeorm';
const Queue = require('bull');
require('dotenv').config();

(async () => {
  const connection = null;
  try {
    const queue = new Queue('recently_playeds_queue', process.env.REDIS_URL);
    console.log(123);
    await queue.process((job) => {
      const data = JSON.parse(job.data);
      console.log(job.data);
      console.log(data[0]);
      console.log(data[0].id);
      console.log(data[0].last_heard);
    });

    // 2. Adding a Job to the Queue
    // await queue.add(data, options);
    // await queue.add('queue-example', { data: 'name' });
    // const data = await queue.process(async (job) => job);
    // console.log(data);
    // connection = await createConnection({
    //   type: 'mysql',
    //   host: process.env.DB_HOST,
    //   port: 3306,
    //   username: process.env.DB_USER,
    //   password: process.env.DB_PASS,
    //   database: process.env.DB_NAME,
    //   entities: [__dirname + '/../**/*.entity{.js}'],
    //   synchronize: false,
    //   logging: ['error'],
    //   extra: {
    //     connectionLimit: 2,
    //   },
    // });
    // const q = await connection.query('SELECT * FROM users WHERE id = 607');
    // console.log(q);
    // connection.close();
  } catch (error) {
    console.log(error);
    if (connection) connection.close();
  }
  process.exit(1);
})();
