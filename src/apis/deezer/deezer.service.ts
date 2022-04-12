import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class DeezerService {
  async getUser(accessToken: string): Promise<any> {
    const response = await axios.get('https://api.deezer.com/user/me', {
      params: {
        "access_token": accessToken,
      }
    });
    return response.data;
  }
}
