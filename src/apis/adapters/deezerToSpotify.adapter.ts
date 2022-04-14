import { DeezerService } from '../deezer/deezer.service';

export class DeezerToSpotifyAdapter {
  private deezerService: DeezerService = null;

  public constructor() {
    this.deezerService = new DeezerService();
  }

  public async getTrackInfo(id: string) {
    const track: any = await this.deezerService.getTrack(id);
    return {
      id: track.id,
      name: track.title,
      album: {
        artists: [
          {
            id: track.artist.id,
            name: track.artist.name,
          },
        ],
        images: [
          {
            url: track.album.cover_xl,
            height: 640,
            width: 640,
          },
        ],
      },
      external_ids: {
        isrc: track.isrc,
      },
    };
  }

  public async getArtistInfo(id: string) {
    const artist: any = await this.deezerService.getArtist(id);
    return {
      id: artist.id,
      name: artist.name,
    };
  }

  public async getAlbumInfo(id: string) {
    const album: any = await this.deezerService.getAlbum(id);
    return {
      id: album.id,
      name: album.label,
    };
  }

  public async getPlaylistInfo(id: string) {
    const playlist: any = await this.deezerService.getPlaylist(id);
    return {
      id: playlist.id,
      name: playlist.title,
      description: playlist.description,
      href: playlist.link,
      uri: playlist.link,
      public: playlist.public,
      images: [
        {
          url: playlist.picture_big,
          height: 500,
          width: 500,
        },
      ],
      tracks: {
        items: playlist.tracks.maps((track) => ({
          id: track.id,
          name: track.title,
          external_ids: {
            isrc: track.isrc,
          },
        })),
      },
    };
  }
}
