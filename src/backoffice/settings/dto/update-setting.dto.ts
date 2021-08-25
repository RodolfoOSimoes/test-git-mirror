import { Admin } from '../../..//entities/admin.entity';

export class UpdateSettingDto {
  setting: {
    title: string;
    subtitle: string;
    terms_and_conditions: string;
    invitation_quantity: number;
    invitation_score: number;
    profile_completed_score: number;
    limited_gratification_score: number;
    uri_playlist: string;
    show_playlist: string;
    splash_screen_title: string;
    splash_screen_message: string;
    enabled_splash_screen: boolean;
    admin: Admin;
  };
}
