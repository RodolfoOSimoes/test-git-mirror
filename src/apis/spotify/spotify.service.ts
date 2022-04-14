import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as querystring from 'querystring';
import { DeezerToSpotifyAdapter } from '../adapters/deezerToSpotify.adapter';

@Injectable()
export class SpotifyService {
  private deezerAdapter: DeezerToSpotifyAdapter;

  constructor() {
    this.deezerAdapter = new DeezerToSpotifyAdapter();
  }

  /* 
     Spotify removed from Filtrgame (2022/04).
     Service not used in Deezer version.
  async authenticateUser(code: string) {
    const auth = Buffer.from(
      `${process.env.SPOTIFY_CLIENT}:${process.env.SPOTIFY_SECRET}`,
    ).toString('base64');

    const headers = {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    const data = querystring.stringify({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: process.env.FILTRGAME_URL,
    });

    try {
      const response = await axios.post(
        'https://accounts.spotify.com/api/token',
        data,
        { headers: headers },
      );
      return response.data;
    } catch (error) {
      console.log('SpotifyService::AuthenticateUser:: ');
      throw new Error('Erro ao gerar credenciais spotify');
    }
  }
  */

  async refreshToken(token: string) {
    const auth = Buffer.from(
      `${process.env.SPOTIFY_CLIENT}:${process.env.SPOTIFY_SECRET}`,
    ).toString('base64');

    const headers = {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    try {
      const response = await axios.post(
        `https://accounts.spotify.com/api/token`,
        querystring.stringify({
          grant_type: 'refresh_token',
          refresh_token: token,
        }),
        {
          headers: headers,
        },
      );
      return response.data;
    } catch (error) {
      console.log('SpotifyService::refreshToken:: ', error.data);
      throw new Error('Erro ao atualizar credenciais spotify');
    }
  }

  /* 
     Spotify removed from Filtrgame (2022/04).
     Service not used in Deezer version.
  async getUserInfo(accessToken: string) {
    const url = 'https://api.spotify.com/v1/me';
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    try {
      const response = await axios.get(url, {
        headers: headers,
      });

      return response.data;
    } catch (error) {
      console.log('SpotifyService::getUserInfo:: ', error);
      throw new Error('Erro ao pegar informações do usuário no spotify');
    }
  } */

  /* Spotify removed from Filtrgame (2022/04).
  async getTrackInfo(id: string) {
    const url = `https://api.spotify.com/v1/tracks/${id}`;

    const { access_token } = await this.refreshToken(process.env.REFRESH_TOKEN);

    const headers = {
      Authorization: `Bearer ${access_token}`,
    };

    try {
      const response = await axios.get(url, {
        headers: headers,
      });

      return response.data;
    } catch (error) {
      console.log('SpotifyService::getTrackInfo:: ', error);
      throw new Error('Erro ao pegar informações da track no spotify.');
    }
  } */
  async getTrackInfo(id: string) {
    try {
      return await this.deezerAdapter.getTrackInfo(id);
    } catch (error) {
      throw new Error('Erro ao pegar informações da track no spotify.');
    }
  }

  /* Spotify removed from Filtrgame (2022/04).
  async getPlaylistName(id: string) {
    const url = `https://api.spotify.com/v1/playlists/${id}?fields=name`;

    const { access_token } = await this.refreshToken(process.env.REFRESH_TOKEN);

    const headers = {
      Authorization: `Bearer ${access_token}`,
    };

    try {
      const response = await axios.get(url, {
        headers: headers,
      });

      return response.data;
    } catch (error) {
      console.log('SpotifyService::getPlaylistName:: ', error);
      throw new Error('Erro ao pegar informações da playlist no spotify.');
    }
  } */
  async getPlaylistName(id: string) {
    try {
      return await this.deezerAdapter.getPlaylistInfo(id);
    } catch (error) {
      throw new Error('Erro ao pegar informações da playlist no spotify.');
    }
  }

  /* Spotify removed from Filtrgame (2022/04).
  async getPlaylistNameAndDescription(id: string) {
    const url = `https://api.spotify.com/v1/playlists/${id}?fields=name%2Cdescription`;

    const { access_token } = await this.refreshToken(process.env.REFRESH_TOKEN);

    const headers = {
      Authorization: `Bearer ${access_token}`,
    };

    try {
      const response = await axios.get(url, {
        headers: headers,
      });

      return response.data;
    } catch (error) {
      console.log('SpotifyService::getPlaylistNameAndDescription:: ', error);
      throw new Error('Erro ao pegar informações da playlist no spotify.');
    }
  }
  */
  async getPlaylistNameAndDescription(id: string) {
    try {
      return await this.deezerAdapter.getPlaylistInfo(id);
    } catch (error) {
      throw new Error('Erro ao pegar informações da playlist no spotify.');
    }
  }

  /* Spotify removed from Filtrgame (2022/04).
  async getArtistInfo(id: string) {
    const url = `https://api.spotify.com/v1/artists/${id}`;

    const { access_token } = await this.refreshToken(process.env.REFRESH_TOKEN);

    const headers = {
      Authorization: `Bearer ${access_token}`,
    };

    try {
      const response = await axios.get(url, {
        headers: headers,
      });

      return response.data;
    } catch (error) {
      console.log('SpotifyService::getArtistInfo:: ', error);
      throw new Error('Erro ao pegar informações da artista no spotify.');
    }
  } */
  async getArtistInfo(id: string) {
    try {
      return await this.deezerAdapter.getArtistInfo(id);
    } catch (error) {
      throw new Error('Erro ao pegar informações da artista no spotify.');
    }
  }

  /* Spotify removed from Filtrgame (2022/04).
  async getAlbumInfo(id: string) {
    const url = `https://api.spotify.com/v1/albums/${id}`;

    const { access_token } = await this.refreshToken(process.env.REFRESH_TOKEN);

    const headers = {
      Authorization: `Bearer ${access_token}`,
    };

    try {
      const response = await axios.get(url, {
        headers: headers,
      });

      return response.data;
    } catch (error) {
      console.log('SpotifyService::getAlbumInfo:: ', error);
      throw new Error('Erro ao pegar informações do album no spotify.');
    }
  } */
  async getAlbumInfo(id: string) {
    try {
      return await this.deezerAdapter.getAlbumInfo(id);
    } catch (error) {
      throw new Error('Erro ao pegar informações do album no spotify.');
    }
  }

  /* Spotify removed from Filtrgame (2022/04).
  async getPlaylistInfo(id: string) {
    const url = `https://api.spotify.com/v1/playlists/${id}`;

    const { access_token } = await this.refreshToken(process.env.REFRESH_TOKEN);

    const headers = {
      Authorization: `Bearer ${access_token}`,
    };

    try {
      const response = await axios.get(url, {
        headers: headers,
      });

      return response.data;
    } catch (error) {
      console.log('SpotifyService::getPlaylistInfo:: ', error);
      throw new Error('Erro ao pegar informações da playlist no spotify.');
    }
  } */
  async getPlaylistInfo(id: string) {
    try {
      return await this.deezerAdapter.getPlaylistInfo(id);
    } catch (error) {
      throw new Error('Erro ao pegar informações da playlist no spotify.');
    }
  }

  async followPlaylist(user_token: string, playlist_id: string) {
    const url = `https://api.spotify.com/v1/playlists/${playlist_id}/followers`;

    const { access_token } = await this.refreshToken(user_token);

    const headers = {
      Authorization: `Bearer ${access_token}`,
    };

    try {
      const response = await axios.put(
        url,
        {
          public: true,
        },
        {
          headers: headers,
        },
      );
      return response.data;
    } catch (error) {
      console.log('SpotifyService::followPlaylist:: ', error);
      throw new Error('Erro ao seguir playlist no spotify.');
    }
  }

  async followArtist(user_token: string, artist_id: string) {
    const url = `https://api.spotify.com/v1/me/following?type=artist&ids=${artist_id}`;

    const { access_token } = await this.refreshToken(user_token);

    const headers = {
      Authorization: `Bearer ${access_token}`,
    };

    try {
      const response = await axios.put(
        url,
        {
          public: true,
        },
        {
          headers: headers,
        },
      );
      return response.data;
    } catch (error) {
      console.log('SpotifyService::followArtist:: ', error);
      throw new Error('Erro ao seguir artista no spotify.');
    }
  }

  async followAlbum(user_token: string, album_id: string) {
    const url = `https://api.spotify.com/v1/me/albums?ids=${album_id}`;

    const { access_token } = await this.refreshToken(user_token);

    const headers = {
      Authorization: `Bearer ${access_token}`,
    };

    try {
      const response = await axios.put(
        url,
        {
          public: true,
        },
        {
          headers: headers,
        },
      );
      return response.data;
    } catch (error) {
      console.log('SpotifyService::followAlbum:: ', error);
      throw new Error('Erro ao seguir album no spotify.');
    }
  }

  async saveTrack(user_token: string, track_id: string) {
    const url = `https://api.spotify.com/v1/me/tracks?ids=${track_id}`;

    const { access_token } = await this.refreshToken(user_token);

    const headers = {
      Authorization: `Bearer ${access_token}`,
    };

    try {
      const response = await axios.put(
        url,
        {
          public: true,
        },
        {
          headers: headers,
        },
      );
      return response.data;
    } catch (error) {
      console.log('SpotifyService::saveTrack:: ', error);
      throw new Error('Erro ao salvar track no spotify.');
    }
  }

  async getRecentlyPlayed(user_token: string, after: any) {
    const url = `https://api.spotify.com/v1/me/player/recently-played?after=${after}&limit=50`;

    const { access_token } = await this.refreshToken(user_token);

    const headers = {
      Authorization: `Bearer ${access_token}`,
    };

    try {
      const response = await axios.get(url, {
        headers: headers,
      });
      return response.data;
    } catch (error) {
      console.log('SpotifyService::getRecentlyPlayed:: ', error);
      throw new Error('Erro ao salvar track no spotify.');
    }
  }

  /* Service not used.
  async getuser(user_token: string) {
    const url = 'https://api.spotify.com/v1/me';

    const { access_token } = await this.refreshToken(user_token);

    const headers = {
      Authorization: `Bearer ${access_token}`,
    };

    try {
      const response = await axios.get(url, {
        headers: headers,
      });

      return response.data;
    } catch (error) {
      console.log('SpotifyService::getUserInfo:: ', error);
      throw new Error('Erro ao pegar informações do usuário no spotify');
    }
  } */
}
