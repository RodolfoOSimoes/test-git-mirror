import { RescueRecords } from 'src/entities/rescue-record.entity';
import { Connection } from 'typeorm';

export const rescueRecordsProviders = [
  {
    provide: 'RESCUE_RECORDS_REPOSITORY',
    useFactory: (connection: Connection) =>
      connection.getRepository(RescueRecords),
    inject: ['DATABASE_CONNECTION'],
  },
];
