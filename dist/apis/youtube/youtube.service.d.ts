export declare class YoutubeService {
    search(url: string): Promise<{
        title: string;
        description: string;
    }>;
    getVideoId(url: string): string;
}
