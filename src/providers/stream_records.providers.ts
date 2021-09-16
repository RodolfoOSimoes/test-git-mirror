import { StreamRecords } from 'src/entities/stream_records.entity';
import { Connection } from 'typeorm';

export const streamRecordsProviders = [
  {
    provide: 'STREAM_RECORDS_REPOSITORY',
    useFactory: (connection: Connection) =>
      connection.getRepository(StreamRecords),
    inject: ['DATABASE_CONNECTION'],
  },
];
