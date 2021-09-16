import { UserStreamRecords } from 'src/entities/user_stream_records.entity';
import { Connection } from 'typeorm';

export const userStreamRecordsProviders = [
  {
    provide: 'USER_STREAM_RECORDS_REPOSITORY',
    useFactory: (connection: Connection) =>
      connection.getRepository(UserStreamRecords),
    inject: ['DATABASE_CONNECTION'],
  },
];
