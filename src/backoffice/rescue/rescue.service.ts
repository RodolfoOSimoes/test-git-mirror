import { Inject, Injectable } from '@nestjs/common';
import { PaginationService } from 'src/utils/pagination/pagination.service';
import { Repository } from 'typeorm';
import { AdminService } from '../admin/admin.service';
import { CreateRescueDto } from './dto/create-rescue.dto';
import { UpdateRescueDto } from './dto/update-rescue.dto';
import { Rescue } from '../../entities/rescue.entity';
import { SpotifyService } from 'src/apis/spotify/spotify.service';

@Injectable()
export class RescueService {
  constructor(
    @Inject('RESCUE_REPOSITORY')
    private rescueRepository: Repository<Rescue>,
    private adminService: AdminService,
    private paginationService: PaginationService,
    private spotifyService: SpotifyService,
  ) {}

  async create(admin_id: number, dto: CreateRescueDto) {
    const admin = await this.adminService.findById(admin_id);

    const trackId = dto.rescue.uri.split(':')[2];

    const track = await this.spotifyService.getTrackInfo(trackId);

    const playlist = dto.rescue.playlist
      ? await this.spotifyService.getPlaylistNameAndDescription(
          dto.rescue.playlist.split(':')[2],
        )
      : undefined;

    await this.rescueRepository.save({
      admin: admin,
      uri: dto.rescue.uri,
      uid: trackId,
      name: track.name,
      artists: track.album?.artists?.map((artist) => artist.name).join(', '),
      cover_url: track?.album.images.find((image) => image?.height == 640)?.url,
      score: dto.rescue.score,
      status: dto.rescue.status,
      isrc: track.external_ids.isrc,
      deleted: false,
      created_at: new Date(),
      updated_at: new Date(),
      rescues_count: 0,
      playlist: dto.rescue.playlist,
      info_playlist: playlist,
      limited: dto.rescue.limited,
      limit_streams: dto.rescue.limit_streams,
      priority: dto.rescue.priority,
    });

    return { message: 'Hit criada com sucesso.' };
  }

  async findAll(page = 1) {
    const limit = 10;
    const count = await this.rescueRepository.count({
      where: { deleted: false },
      order: { priority: 'ASC', id: 'DESC' },
    });

    const data = (
      await this.rescueRepository.find({
        skip: (page - 1) * limit,
        take: limit,
        where: { deleted: false },
        order: { status: 'DESC', priority: 'ASC', id: 'DESC' },
      })
    )
      ?.map((rescue) => this.rescueMapper(rescue))
      ?.sort((a, b) => {
        if (a.priority == b.priority) return b.id - a.id;
        else return a.priority - b.priority;
      });

    return {
      data,
      currentPage: page,
      size: Math.ceil(count / limit),
      links: this.paginationService.pagination(
        'v1/backoffice/rescues',
        page,
        limit,
        count,
      ),
    };
  }

  async findOne(id: number) {
    return await this.rescueRepository.findOne(id);
  }

  async update(admin_id: number, id: number, dto: UpdateRescueDto) {
    const admin = await this.adminService.findById(admin_id);
    await this.rescueRepository.update(id, {
      admin: admin,
      uri: dto.rescue.uri,
      status: dto.rescue.status,
      limit_streams: dto.rescue.limit_streams,
      limited: dto.rescue.limited,
      priority: dto.rescue.priority,
    });
    return { message: 'Hit atualizada com sucesso.' };
  }

  async remove(id: number) {
    await this.rescueRepository.update(id, {
      deleted: true,
    });

    return { message: 'Hit deletada com sucesso.' };
  }

  async findUsers(id: number, page = 1, limit = 25) {
    const uniqueUserIds = await this.rescueRepository.query(
      `SELECT DISTINCT(user_id) FROM cash_backs cb INNER JOIN users u ON cb.user_id = u.id WHERE rescue_id = ? GROUP BY user_id`,
      [id],
    );

    const count = uniqueUserIds.length;

    const users = await this.rescueRepository.query(
      `SELECT u.id, u.name, u.email, count(*) AS total_streams FROM cash_backs cb INNER JOIN users u ON cb.user_id = u.id
    WHERE rescue_id = ? GROUP BY user_id ORDER BY total_streams DESC LIMIT ? OFFSET ?`,
      [id, limit, (page - 1) * limit],
    );

    return {
      data: this.usersMapper(users),
      currentPage: page,
      size: Math.ceil(count / limit),
      links: this.paginationService.pagination(
        'v1/backoffice/rescues',
        page,
        limit,
        count,
      ),
    };
  }

  usersMapper(users) {
    return users.map((user) => {
      return {
        type: 'cash_backs',
        id: user.id,
        name: user.name,
        total_streams: user.total_streams,
      };
    });
  }

  rescueMapper(rescue: Rescue) {
    return {
      id: rescue.id,
      score: rescue.score,
      track_name: rescue.name,
      artists: rescue.artists,
      rescues_count: rescue.rescues_count,
      limit_streams: rescue.limit_streams,
      info_playlist: rescue.info_playlist,
      priority: rescue.priority,
      status: rescue.status,
    };
  }
}
