export declare class SpotifyService {
    authenticateUser(code: string): Promise<any>;
    refreshToken(token: string): Promise<any>;
    getuserInfo(accessToken: string): Promise<any>;
    getTrackInfo(id: string): Promise<any>;
    getPlaylistName(id: string): Promise<any>;
    getPlaylistNameAndDescription(id: string): Promise<any>;
    getArtistInfo(id: string): Promise<any>;
    getAlbumInfo(id: string): Promise<any>;
    getPlaylistInfo(id: string): Promise<any>;
    followPlaylist(user_token: string, playlist_id: string): Promise<any>;
    followArtist(user_token: string, artist_id: string): Promise<any>;
    followAlbum(user_token: string, album_id: string): Promise<any>;
    saveTrack(user_token: string, track_id: string): Promise<any>;
    getRecentlyPlayed(user_token: string, after: any): Promise<any>;
    getuser(user_token: string): Promise<any>;
}
