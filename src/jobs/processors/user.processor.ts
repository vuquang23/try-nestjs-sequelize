import { Process, Processor } from '@nestjs/bull';
import { QUEUE_NAMES, JOBS } from '../job.constant';
import { ElasticsearchHelper } from '../../common/helpers/elasticsearch.helper';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Job } from 'bull';

@Processor(QUEUE_NAMES.SYNC_QUEUE)
export class UserProcessor {
  index: string = ElasticsearchHelper.INDEX.USER;

  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  @Process(JOBS.CREATE_USER)
  create(job: Job) {
    const { id, name, email } = job.data;
    return this.elasticsearchService.index({
      index: this.index,
      id: id,
      body: {
        name: name,
        email: email,
      },
    });
  }

  @Process(JOBS.UPDATE_USER)
  update(job: Job) {
    const { id, name, email } = job.data;
    return this.elasticsearchService.update({
      index: this.index,
      id: id,
      body: {
        doc: {
          name: name,
          email: email,
        },
      },
    });
  }

  @Process(JOBS.DELETE_USER)
  delete(job: Job) {
    const { id } = job.data;
    return this.elasticsearchService.delete({
      index: this.index,
      id: id,
    });
  }
}
