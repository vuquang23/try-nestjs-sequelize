export interface IAppConfig {
  name: string;
  version: string;
  url: string;
  port: string;
  env: string;
  apiPrefix: string;
  enableCors: boolean;
  corsOrigin: string[];
}
