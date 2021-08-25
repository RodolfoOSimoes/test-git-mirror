import { Connection } from 'typeorm';
import { CampaignUserBalance } from '../entities/campaign-user-balance.entity';

export const campaignUserBalanceProviders = [
  {
    provide: 'CAMPAIGN_USER_BALANCE_REPOSITORY',
    useFactory: (connection: Connection) =>
      connection.getRepository(CampaignUserBalance),
    inject: ['DATABASE_CONNECTION'],
  },
];
