import { SpotifyService } from 'src/apis/spotify/spotify.service';
import { YoutubeService } from 'src/apis/youtube/youtube.service';
import { Admin } from 'src/entities/admin.entity';
import { QuestOpts } from 'src/entities/quest-opts.entity';
import { QuestPreSaves } from 'src/entities/quest-pre-saves.entity';
import { QuestQuestions } from 'src/entities/quest-questions.entity';
import { QuestSpotifies } from 'src/entities/quest-spotifies.entity';
import { QuestSpotifyPlaylists } from 'src/entities/quest-spotify-playlists.entity';
import { QuestYoutubes } from 'src/entities/quest-youtubes.entity';
import { Quest } from 'src/entities/quest.entity';
import { getDate } from 'src/utils/date.utils';
import { getPlaylistIdElementFromUri } from 'src/utils/playlist.utils';
import { CreateQuestDto } from './dto/create-quest.dto';

export class QuestBuildService {
  async buildQuest(dto: CreateQuestDto, admin: Admin): Promise<Quest> {
    const { quest_kind } = dto.quest;
    const { quest } = dto;

    let newQuest = new Quest();
    newQuest.admin = admin;
    newQuest.status = quest.status;
    newQuest.score = quest.score;
    newQuest.created_at = new Date();
    newQuest.updated_at = new Date();
    newQuest.date_start = getDate(quest.date_start);
    newQuest.accomplished_count = 0;

    switch (quest_kind) {
      case 'quest_spotify':
        // newQuest = await new QuestSpotifiesFactory().buildQuest(newQuest, dto);
        break;
      case 'quest_question':
        // newQuest = await new QuestQuestionsFactory().buildQuest(newQuest, dto);
        break;
      case 'quest_youtube':
        // newQuest = await new QuestYoutubesFactory().buildQuest(newQuest, dto);
        break;
      case 'quest_pre_save':
        newQuest = await new QuestPreSavesFactory().buildQuest(newQuest, dto);
        break;
      case 'quest_opt':
        // newQuest = await new QuestOptsFactory().buildQuest(newQuest, dto);
        break;
      case 'quest_spotify_playlist':
        // newQuest = await new QuestSpotifyPlaylistsFactory().buildQuest(
        //   newQuest,
        //   dto,
        // );
        break;
    }

    return newQuest;
  }
}

interface QuestFactory {
  buildQuest(quest: Quest, dto: CreateQuestDto): Promise<Quest>;
}

export class QuestOptsFactory implements QuestFactory {
  public async buildQuest(quest: Quest, dto: CreateQuestDto): Promise<Quest> {
    const questType = new QuestOpts();
    questType.description = dto.quest.quest_opt_attributes.description;
    questType.created_at = new Date();
    questType.updated_at = new Date();
    quest.quest_opts = questType;
    quest.kind = 11;
    return quest;
  }
}

export class QuestPreSavesFactory implements QuestFactory {
  public async buildQuest(quest: Quest, dto: CreateQuestDto): Promise<Quest> {
    const questType = new QuestPreSaves();
    questType.uri = dto.quest.quest_pre_save_attributes.uri;
    questType.launch_in = dto.quest.quest_pre_save_attributes.launch_in;
    questType.name_artist = dto.quest.quest_pre_save_attributes.name_artist;
    questType.name_product = dto.quest.quest_pre_save_attributes.name_product;
    questType.created_at = new Date();
    questType.updated_at = new Date();
    quest.quest_pre_saves = questType;
    quest.kind = 10;
    return quest;
  }
}

export class QuestQuestionsFactory implements QuestFactory {
  public async buildQuest(quest: Quest, dto: CreateQuestDto): Promise<Quest> {
    const questType = new QuestQuestions();
    questType.question = dto.quest.quest_question_attributes.question;
    questType.answer = dto.quest.quest_question_attributes.answer;
    questType.created_at = new Date();
    questType.updated_at = new Date();
    quest.quest_questions = questType;
    quest.kind = 5;
    return quest;
  }
}

export class QuestSpotifiesFactory implements QuestFactory {
  public async buildQuest(quest: Quest, dto: CreateQuestDto): Promise<Quest> {
    const spotifyService = new SpotifyService();
    const questType = new QuestSpotifies();
    questType.created_at = new Date();
    questType.updated_at = new Date();
    questType.to_listen = dto.quest.quest_spotify_attributes.to_listen;
    questType.uri = dto.quest.quest_spotify_attributes.uri;
    questType.uid = dto.quest.quest_spotify_attributes.uri.split(':')[2];

    if (dto.quest.quest_spotify_attributes.uri.indexOf('artist') != -1) {
      const artist = await spotifyService.getArtistInfo(questType.uid);
      questType.name = artist?.name;
      quest.kind = 0;
      questType.kind = 1;
    } else if (
      dto.quest.quest_spotify_attributes.uri.indexOf('playlist') != -1
    ) {
      const playlist = await spotifyService.getPlaylistName(questType.uid);
      questType.name = playlist?.name;
      quest.kind = 1;
      questType.kind = 0;
    } else if (
      dto.quest.quest_spotify_attributes.uri.indexOf('track') != -1 &&
      !dto.quest.quest_spotify_attributes.to_listen
    ) {
      const track = await spotifyService.getTrackInfo(questType.uid);
      questType.name = track?.name;
      questType.isrc = track?.external_ids?.isrc;
      quest.kind = 2;
      questType.kind = 3;
    } else if (dto.quest.quest_spotify_attributes.uri.indexOf('album') != -1) {
      const almum = await spotifyService.getAlbumInfo(questType.uid);
      questType.name = almum?.name;
      quest.kind = 3;
      questType.kind = 2;
    } else if (
      dto.quest.quest_spotify_attributes.uri.indexOf('track') != -1 &&
      dto.quest.quest_spotify_attributes.to_listen
    ) {
      const track = await spotifyService.getTrackInfo(questType.uid);
      questType.name = track?.name;
      questType.isrc = track?.external_ids?.isrc;
      quest.kind = 4;
      questType.kind = 3;
    }

    quest.quest_spotifies = questType;
    return quest;
  }
}

export class QuestSpotifyPlaylistsFactory implements QuestFactory {
  public async buildQuest(quest: Quest, dto: CreateQuestDto): Promise<Quest> {
    const questType = new QuestSpotifyPlaylists();
    const spotifyService = new SpotifyService();

    questType.uri = dto.quest.quest_spotify_playlist_attributes.uri;
    questType.points_for_question =
      dto.quest.quest_spotify_playlist_attributes.points_for_question;
    questType.question = dto.quest.quest_spotify_playlist_attributes.question;
    questType.answer = dto.quest.quest_spotify_playlist_attributes.answer;
    questType.points_for_question_2 =
      dto.quest.quest_spotify_playlist_attributes.points_for_question_2;
    questType.question_2 =
      dto.quest.quest_spotify_playlist_attributes.question_2;
    questType.answer_2 = dto.quest.quest_spotify_playlist_attributes.answer_2;
    questType.points_for_track =
      dto.quest.quest_spotify_playlist_attributes.points_for_track;
    questType.tracks_count =
      dto.quest.quest_spotify_playlist_attributes.tracks_count;
    quest.score =
      dto.quest.quest_spotify_playlist_attributes.points_for_track *
      dto.quest.quest_spotify_playlist_attributes.tracks_count;

    const playlistId: string = getPlaylistIdElementFromUri(questType.uri);
    const playlist = await spotifyService.getPlaylistInfo(playlistId);

    questType.cover_url = playlist?.images[0]?.url;
    questType.name = playlist.name;
    questType.tracks = this.joinTracks(playlist.tracks.items);

    questType.created_at = new Date();
    questType.updated_at = new Date();
    quest.quest_spotify_playlists = questType;
    quest.kind = 12;
    return quest;
  }

  private joinTracks(tracks: Array<any>): string {
    return tracks.map((track) => track.id).join(';');
  }
}

export class QuestYoutubesFactory implements QuestFactory {
  public async buildQuest(quest: Quest, dto: CreateQuestDto): Promise<Quest> {
    const questType = new QuestYoutubes();

    questType.created_at = new Date();
    questType.updated_at = new Date();
    questType.url = dto.quest.quest_youtube_attributes.url;
    const youtubeService = new YoutubeService();

    const { title } = await youtubeService.search(questType.url);
    questType.name = title;

    if (dto.quest.quest_youtube_attributes.url.indexOf('/channel') != -1) {
      questType.kind = 0;
      quest.kind = 6;
    } else if (dto.quest.quest_youtube_attributes.url.indexOf('/watch') != -1) {
      questType.kind = 1;
      quest.kind = 7;
    } else if (dto.quest.quest_youtube_attributes.url.indexOf('/user') != -1) {
      questType.kind = 2;
      quest.kind = 6;
    }

    quest.quest_youtubes = questType;
    return quest;
  }
}
