import { SpotifyService } from 'src/apis/spotify/spotify.service';
import { Campaign } from 'src/entities/campaign.entity';
import { CashBack } from 'src/entities/cash-backs.entity';
import { Quest } from 'src/entities/quest.entity';
import { RecentlyPlayeds } from 'src/entities/recently-playeds.entity';
import { Rescue } from 'src/entities/rescue.entity';
import { Statement } from 'src/entities/statement.entity';
import { UserQuestSpotifyPlaylist } from 'src/entities/user-quest-spotify-playlists.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { RecentlyPlayedJob } from './RecentlyPlayedJob';

(async () => {
  console.log('123123');
  const spotifyService = new SpotifyService();
  const userRepository = new Repository<User>();
  const campaignRepository = new Repository<Campaign>();
  const rescueRepository = new Repository<Rescue>();
  const recentlyPlayedsRepository = new Repository<RecentlyPlayeds>();
  const cashBackRepository = new Repository<CashBack>();
  const statementRepository = new Repository<Statement>();
  const questRepository = new Repository<Quest>();
  const userQuestRepository = new Repository<UserQuestSpotifyPlaylist>();
  const recently = new RecentlyPlayedJob(
    userRepository,
    campaignRepository,
    rescueRepository,
    recentlyPlayedsRepository,
    cashBackRepository,
    statementRepository,
    questRepository,
    userQuestRepository,
    spotifyService,
  );
  await recently.handleCron();
  console.log('123123');
})();
