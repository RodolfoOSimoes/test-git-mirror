import { Connection } from 'typeorm';
import { NewsLetter } from '../entities/newsletter.entity';

export const newsletterProviders = [
  {
    provide: 'NEWSLETTER_REPOSITORY',
    useFactory: (connection: Connection) =>
      connection.getRepository(NewsLetter),
    inject: ['DATABASE_CONNECTION'],
  },
];
