export declare class PaginationService {
    pagination(route: string, page: number, limit: number, count: number): {
        self: string;
        first: string;
        prev: string;
        next: string;
        last: string;
    };
}
