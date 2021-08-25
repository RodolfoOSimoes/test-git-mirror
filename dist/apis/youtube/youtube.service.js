"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.YoutubeService = void 0;
const common_1 = require("@nestjs/common");
const googleapis_1 = require("googleapis");
let YoutubeService = class YoutubeService {
    async search(url) {
        try {
            const id = this.getVideoId(url);
            const info = await googleapis_1.google.youtube('v3').search.list({
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
        }
        catch (error) {
            throw Error(error.message);
        }
    }
    getVideoId(url) {
        if (url.includes('channel/')) {
            const result = url.split('/channel/')[1];
            return result.split('?')[0];
        }
        else if (url.includes('watch?v=')) {
            const result = url.split('watch?v=')[1];
            return result.split('&')[0];
        }
        else
            throw new Error('Invalid URL: ' + url);
    }
};
YoutubeService = __decorate([
    common_1.Injectable()
], YoutubeService);
exports.YoutubeService = YoutubeService;
//# sourceMappingURL=youtube.service.js.map