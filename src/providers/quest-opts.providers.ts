import { QuestOpts } from 'src/entities/quest-opts.entity';
import { Connection } from 'typeorm';

export const questOptsProviders = [
  {
    provide: 'QUEST_OPTS_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(QuestOpts),
    inject: ['DATABASE_CONNECTION'],
  },
];
