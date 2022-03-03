import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { ElasticsearchHelper } from '../../common/helpers/elasticsearch.helper';

@Injectable()
export class SearchUserService {
  constructor(private elasticsearchService: ElasticsearchService) {}

  public async findAll() {
    const data = await this.elasticsearchService.search({
      index: ElasticsearchHelper.INDEX.USER,
    });
    return data;
  }

  public async findOne(id: string) {
    const data = await this.elasticsearchService.search({
      index: ElasticsearchHelper.INDEX.USER,
      query: {
        match: {
          _id: id,
        },
      },
    });

    return data;
  }
}
