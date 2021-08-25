import { Connection } from 'typeorm';
import { Campaign } from '../entities/campaign.entity';

export const campaignProviders = [
  {
    provide: 'CAMPAIGN_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Campaign),
    inject: ['DATABASE_CONNECTION'],
  },
];
