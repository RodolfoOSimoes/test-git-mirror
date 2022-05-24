export class CreateCampaignDto {
  campaign: {
    name: string;
    slug: string;
    status: boolean;
    date_start: string;
    date_finish: string;
    enable_banner: boolean;
    image: {
      banner?: string;
      image?: string;
      image_medium?: string;
      image_small?: string;
    };
  };
}
