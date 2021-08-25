export interface Verify2faInterface {
    login: {
        pre_token: string;
        code: string;
    };
}
