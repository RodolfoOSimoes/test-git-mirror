import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class DeezerService {
  async getUser(accessToken: string): Promise<any> {
    const response: any = await axios.get('https://api.deezer.com/user/me', {
      params: {
        access_token: accessToken,
      },
    });
    return response.data;
  }

  async getTrack(id: string) {
    const response: any = await axios.get(`https://api.deezer.com/track/${id}`);
    return response.data;
  }

  async getAlbum(id: string) {
    const response: any = await axios.get(`https://api.deezer.com/album/${id}`);
    return response.data;
  }

  async getArtist(id: string) {
    const response: any = await axios.get(
      `https://api.deezer.com/artist/${id}`,
    );
    return response.data;
  }

  async getPlaylist(id: string) {
    const response: any = await axios.get(
      `https://api.deezer.com/playlist/${id}`,
    );
    return response.data;
  }
}
