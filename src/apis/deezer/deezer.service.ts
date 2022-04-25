import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class DeezerService {
  public getUser(accessToken: string): Promise<any> {
    return axios
      .get('https://api.deezer.com/user/me', {
        params: {
          access_token: accessToken,
        },
      })
      .then((response) => response.data);
  }

  public getTrack(id: string) {
    return axios
      .get(`https://api.deezer.com/track/${id}`)
      .then((response) => response.data);
  }

  public getAlbum(id: string) {
    return axios
      .get(`https://api.deezer.com/album/${id}`)
      .then((response) => response.data);
  }

  public getArtist(id: string) {
    return axios
      .get(`https://api.deezer.com/artist/${id}`)
      .then((response) => response.data);
  }

  public getPlaylist(id: string) {
    return axios
      .get(`https://api.deezer.com/playlist/${id}`)
      .then((response) => response.data);
  }

  public favoriteArtist(accessToken: string, id: string): Promise<boolean> {
    return axios.post(`https://api.deezer.com/user/me/artists`, {
      params: {
        access_token: accessToken,
        artist_id: id,
      },
    });
  }

  public favoriteTrack(accessToken: string, id: string): Promise<boolean> {
    return axios.post(`https://api.deezer.com/user/me/tracks`, {
      params: {
        access_token: accessToken,
        track_id: id,
      },
    });
  }

  public favoriteAlbum(accessToken: string, id: string): Promise<boolean> {
    return axios.post(`https://api.deezer.com/user/me/albums`, {
      params: {
        access_token: accessToken,
        album_id: id,
      },
    });
  }

  public favoritePlaylist(accessToken: string, id: string): Promise<boolean> {
    return axios.post(`https://api.deezer.com/user/me/playlists`, {
      params: {
        access_token: accessToken,
        playlist_id: id,
      },
    });
  }

  public history(accessToken: string): Promise<any> {
    return axios.get('https://api.deezer.com/user/me/history', {
      params: {
        access_token: accessToken,
      },
    });
  }
}
