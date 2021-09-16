export class CreateQuestDto {
  quest: {
    date_start: string;
    kind: number;
    score: number;
    status: boolean;
    deleted: boolean;
    accomplished_count: number;
    quest_kind: string;
    quest_spotify_attributes: {
      uri: string;
      to_listen: boolean;
    };
    quest_question_attributes: { question: string; answer: string };
    quest_youtube_attributes: { url: string };
    quest_pre_save_attributes: {
      name_artist: string;
      name_product: string;
      launch_in: Date;
      uri: string;
    };
    quest_opt_attributes: { description: string };
    quest_spotify_playlist_attributes: {
      uri: string;
      question: string;
      answer: string;
      question_2: string;
      answer_2: string;
      tracks_count: number;
      points_for_track: number;
      points_for_question: number;
      points_for_question_2: number;
    };
  };
}
