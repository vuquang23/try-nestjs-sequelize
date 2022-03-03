import { IElasticsearchConfig } from './elasticsearch-config.interface';

export const getElasticsearchConfig = (): IElasticsearchConfig => ({
  node: process.env.ELASTICSEARCH_NODE,
  namespace: process.env.ELASTICSEARCH_NAMESPACE,
  username: process.env.ELASTICSEARCH_USERNAME,
  password: process.env.ELASTICSEARCH_PASSWORD,
});
