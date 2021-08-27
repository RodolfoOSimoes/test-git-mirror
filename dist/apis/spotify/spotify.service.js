"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpotifyService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const querystring = require("querystring");
let SpotifyService = class SpotifyService {
    async authenticateUser(code) {
        const auth = Buffer.from(`${process.env.SPOTIFY_CLIENT}:${process.env.SPOTIFY_SECRET}`).toString('base64');
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
            const response = await axios_1.default.post('https://accounts.spotify.com/api/token', data, { headers: headers });
            return response.data;
        }
        catch (error) {
            console.log('SpotifyService::AuthenticateUser:: ');
            throw new Error('Erro ao gerar credenciais spotify');
        }
    }
    async refreshToken(token) {
        const auth = Buffer.from(`${process.env.SPOTIFY_CLIENT}:${process.env.SPOTIFY_SECRET}`).toString('base64');
        const headers = {
            Authorization: `Basic ${auth}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        };
        try {
            const response = await axios_1.default.post(`https://accounts.spotify.com/api/token`, querystring.stringify({
                grant_type: 'refresh_token',
                refresh_token: token,
            }), {
                headers: headers,
            });
            return response.data;
        }
        catch (error) {
            console.log('SpotifyService::refreshToken:: ', error.data);
            throw new Error('Erro ao atualizar credenciais spotify');
        }
    }
    async getuserInfo(accessToken) {
        const url = 'https://api.spotify.com/v1/me';
        const headers = {
            Authorization: `Bearer ${accessToken}`,
        };
        try {
            const response = await axios_1.default.get(url, {
                headers: headers,
            });
            return response.data;
        }
        catch (error) {
            console.log('SpotifyService::getuserInfo:: ', error);
            throw new Error('Erro ao pegar informações do usuário no spotify');
        }
    }
    async getTrackInfo(id) {
        const url = `https://api.spotify.com/v1/tracks/${id}`;
        const { access_token } = await this.refreshToken(process.env.REFRESH_TOKEN);
        const headers = {
            Authorization: `Bearer ${access_token}`,
        };
        try {
            const response = await axios_1.default.get(url, {
                headers: headers,
            });
            return response.data;
        }
        catch (error) {
            console.log('SpotifyService::getTrackInfo:: ', error);
            throw new Error('Erro ao pegar informações da track no spotify.');
        }
    }
    async getPlaylistName(id) {
        const url = `https://api.spotify.com/v1/playlists/${id}?fields=name`;
        const { access_token } = await this.refreshToken(process.env.REFRESH_TOKEN);
        const headers = {
            Authorization: `Bearer ${access_token}`,
        };
        try {
            const response = await axios_1.default.get(url, {
                headers: headers,
            });
            return response.data;
        }
        catch (error) {
            console.log('SpotifyService::getPlaylistName:: ', error);
            throw new Error('Erro ao pegar informações da playlist no spotify.');
        }
    }
    async getPlaylistNameAndDescription(id) {
        const url = `https://api.spotify.com/v1/playlists/${id}?fields=name%2Cdescription`;
        const { access_token } = await this.refreshToken(process.env.REFRESH_TOKEN);
        const headers = {
            Authorization: `Bearer ${access_token}`,
        };
        try {
            const response = await axios_1.default.get(url, {
                headers: headers,
            });
            return response.data;
        }
        catch (error) {
            console.log('SpotifyService::getPlaylistNameAndDescription:: ', error);
            throw new Error('Erro ao pegar informações da playlist no spotify.');
        }
    }
    async getArtistInfo(id) {
        const url = `https://api.spotify.com/v1/artists/${id}`;
        const { access_token } = await this.refreshToken(process.env.REFRESH_TOKEN);
        const headers = {
            Authorization: `Bearer ${access_token}`,
        };
        try {
            const response = await axios_1.default.get(url, {
                headers: headers,
            });
            return response.data;
        }
        catch (error) {
            console.log('SpotifyService::getArtistInfo:: ', error);
            throw new Error('Erro ao pegar informações da artista no spotify.');
        }
    }
    async getAlbumInfo(id) {
        const url = `https://api.spotify.com/v1/albums/${id}`;
        const { access_token } = await this.refreshToken(process.env.REFRESH_TOKEN);
        const headers = {
            Authorization: `Bearer ${access_token}`,
        };
        try {
            const response = await axios_1.default.get(url, {
                headers: headers,
            });
            return response.data;
        }
        catch (error) {
            console.log('SpotifyService::getAlbumInfo:: ', error);
            throw new Error('Erro ao pegar informações do album no spotify.');
        }
    }
    async getPlaylistInfo(id) {
        const url = `https://api.spotify.com/v1/playlists/${id}`;
        const { access_token } = await this.refreshToken(process.env.REFRESH_TOKEN);
        const headers = {
            Authorization: `Bearer ${access_token}`,
        };
        try {
            const response = await axios_1.default.get(url, {
                headers: headers,
            });
            return response.data;
        }
        catch (error) {
            console.log('SpotifyService::getPlaylistInfo:: ', error);
            throw new Error('Erro ao pegar informações da playlist no spotify.');
        }
    }
    async followPlaylist(user_token, playlist_id) {
        const url = `https://api.spotify.com/v1/playlists/${playlist_id}/followers`;
        const { access_token } = await this.refreshToken(user_token);
        const headers = {
            Authorization: `Bearer ${access_token}`,
        };
        try {
            const response = await axios_1.default.put(url, {
                public: true,
            }, {
                headers: headers,
            });
            return response.data;
        }
        catch (error) {
            console.log('SpotifyService::followPlaylist:: ', error);
            throw new Error('Erro ao seguir playlist no spotify.');
        }
    }
    async followArtist(user_token, artist_id) {
        const url = `https://api.spotify.com/v1/me/following?type=artist&ids=${artist_id}`;
        const { access_token } = await this.refreshToken(user_token);
        const headers = {
            Authorization: `Bearer ${access_token}`,
        };
        try {
            const response = await axios_1.default.put(url, {
                public: true,
            }, {
                headers: headers,
            });
            return response.data;
        }
        catch (error) {
            console.log('SpotifyService::followArtist:: ', error);
            throw new Error('Erro ao seguir artista no spotify.');
        }
    }
    async followAlbum(user_token, album_id) {
        const url = `https://api.spotify.com/v1/me/albums?ids=${album_id}`;
        const { access_token } = await this.refreshToken(user_token);
        const headers = {
            Authorization: `Bearer ${access_token}`,
        };
        try {
            const response = await axios_1.default.put(url, {
                public: true,
            }, {
                headers: headers,
            });
            return response.data;
        }
        catch (error) {
            console.log('SpotifyService::followAlbum:: ', error);
            throw new Error('Erro ao seguir album no spotify.');
        }
    }
    async saveTrack(user_token, track_id) {
        const url = `https://api.spotify.com/v1/me/tracks?ids=${track_id}`;
        const { access_token } = await this.refreshToken(user_token);
        const headers = {
            Authorization: `Bearer ${access_token}`,
        };
        try {
            const response = await axios_1.default.put(url, {
                public: true,
            }, {
                headers: headers,
            });
            return response.data;
        }
        catch (error) {
            console.log('SpotifyService::saveTrack:: ', error);
            throw new Error('Erro ao salvar track no spotify.');
        }
    }
    async getRecentlyPlayed(user_token, after) {
        const url = `https://api.spotify.com/v1/me/player/recently-played?after=${after}&limit=50`;
        const { access_token } = await this.refreshToken(user_token);
        const headers = {
            Authorization: `Bearer ${access_token}`,
        };
        try {
            const response = await axios_1.default.get(url, {
                headers: headers,
            });
            return response.data;
        }
        catch (error) {
            console.log('SpotifyService::getRecentlyPlayed:: ', error);
            throw new Error('Erro ao salvar track no spotify.');
        }
    }
    async getuser(user_token) {
        const url = 'https://api.spotify.com/v1/me';
        const { access_token } = await this.refreshToken(user_token);
        console.log(access_token);
        const headers = {
            Authorization: `Bearer ${access_token}`,
        };
        try {
            const response = await axios_1.default.get(url, {
                headers: headers,
            });
            return response.data;
        }
        catch (error) {
            console.log('SpotifyService::getuserInfo:: ');
            throw new Error('Erro ao pegar informações do usuário no spotify');
        }
    }
};
SpotifyService = __decorate([
    common_1.Injectable()
], SpotifyService);
exports.SpotifyService = SpotifyService;
//# sourceMappingURL=spotify.service.js.map