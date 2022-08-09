import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { google } from 'googleapis';

@Injectable()
export class YoutubeService {
  async search(url: string) {
    try {
      const id = this.getVideoId(url);
      const info = await google.youtube('v3').search.list({
        key: process.env.GOOGLE_API_KEY,
        part: ['snippet'],
        q: id,
      });

      const { items } = info.data;

      const { snippet } = items.find((item) => (item.id.videoId = id));
      return {
        title: snippet.title,
        description: snippet.description,
      };
    } catch (error) {
      throw Error(error.message);
    }
  }

  getVideoId(url: string) {
    if (url.includes('channel/')) {
      const result = url.split('/channel/')[1];
      return result.split('?')[0];
    } else if (url.includes('watch?v=')) {
      const result = url.split('watch?v=')[1];
      return result.split('&')[0];
    } else throw new Error('Invalid URL: ' + url);
  }

  getUser(credentials: any): Promise<any> {
    return axios.get('https://www.googleapis.com/userinfo/v2/me', {
      headers: {
        Authorization: `Bearer ${credentials['access_token']}`,
      },
    })
    .then((response: any) => response.data);
  }

  revokeAccessToken(credentials: any) {
    return axios.post('https://oauth2.googleapis.com/revoke', {
      token: credentials['refresh_token'],
    });
  }
}
