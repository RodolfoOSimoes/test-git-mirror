import { Injectable } from '@nestjs/common';
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
}
