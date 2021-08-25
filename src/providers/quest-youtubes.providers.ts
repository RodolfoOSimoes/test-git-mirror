import { QuestYoutubes } from 'src/entities/quest-youtubes.entity';
import { Connection } from 'typeorm';

export const questYoutubesProviders = [
  {
    provide: 'QUEST_YOUTUBES_REPOSITORY',
    useFactory: (connection: Connection) =>
      connection.getRepository(QuestYoutubes),
    inject: ['DATABASE_CONNECTION'],
  },
];
