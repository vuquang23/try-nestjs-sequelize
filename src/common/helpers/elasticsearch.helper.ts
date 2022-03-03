import { getElasticsearchConfig } from '../../config/elasticsearch';

export class ElasticsearchHelper {
  private static PREFIX = getElasticsearchConfig().namespace + '_';
  static INDEX = {
    POST: ElasticsearchHelper.addPrefix('posts'),
    USER: ElasticsearchHelper.addPrefix('users'),
  };

  private static addPrefix(index: string) {
    return ElasticsearchHelper.PREFIX + index;
  }
}
