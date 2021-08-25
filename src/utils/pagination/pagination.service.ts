import { Injectable } from '@nestjs/common';

@Injectable()
export class PaginationService {
  pagination(route: string, page = 1, limit: number, count: number) {
    const current = page;
    const last = Math.ceil(count / limit);
    return {
      self: `${process.env.FILTRGAME_URL}/${route}?page=${page}`,
      first: `${process.env.FILTRGAME_URL}/${route}?page=1`,
      prev:
        current != 1
          ? `${process.env.FILTRGAME_URL}/${route}?page=${--page}`
          : null,
      next:
        current == last
          ? `${process.env.FILTRGAME_URL}/${route}?page=${++page}`
          : null,
      last: `${process.env.FILTRGAME_URL}/${route}?page=${last}`,
    };
  }
}
