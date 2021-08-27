"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const spotify_service_1 = require("../apis/spotify/spotify.service");
const campaign_entity_1 = require("../entities/campaign.entity");
const cash_backs_entity_1 = require("../entities/cash-backs.entity");
const quest_entity_1 = require("../entities/quest.entity");
const recently_playeds_entity_1 = require("../entities/recently-playeds.entity");
const rescue_entity_1 = require("../entities/rescue.entity");
const statement_entity_1 = require("../entities/statement.entity");
const user_quest_spotify_playlists_entity_1 = require("../entities/user-quest-spotify-playlists.entity");
const user_entity_1 = require("../entities/user.entity");
const typeorm_1 = require("typeorm");
const RecentlyPlayedJob_1 = require("./RecentlyPlayedJob");
(async () => {
    console.log('123123');
    const spotifyService = new spotify_service_1.SpotifyService();
    const userRepository = new typeorm_1.Repository();
    const campaignRepository = new typeorm_1.Repository();
    const rescueRepository = new typeorm_1.Repository();
    const recentlyPlayedsRepository = new typeorm_1.Repository();
    const cashBackRepository = new typeorm_1.Repository();
    const statementRepository = new typeorm_1.Repository();
    const questRepository = new typeorm_1.Repository();
    const userQuestRepository = new typeorm_1.Repository();
    const recently = new RecentlyPlayedJob_1.RecentlyPlayedJob(userRepository, campaignRepository, rescueRepository, recentlyPlayedsRepository, cashBackRepository, statementRepository, questRepository, userQuestRepository, spotifyService);
    await recently.handleCron();
    console.log('123123');
})();
//# sourceMappingURL=ExecuteCron.js.map