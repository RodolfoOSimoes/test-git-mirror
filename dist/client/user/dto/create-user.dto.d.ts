export declare class CreateUserDto {
    user: {
        name: string;
        email: string;
        city_id: number;
        birthdate: Date;
        image: {
            data: string;
        };
        phone: string;
    };
}
