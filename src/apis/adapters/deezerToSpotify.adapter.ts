import { DeezerService } from '../deezer/deezer.service';

export class DeezerToSpotifyAdapter {
  private deezerService: DeezerService = null;

  constructor() {
    this.deezerService = new DeezerService();
  }
}
