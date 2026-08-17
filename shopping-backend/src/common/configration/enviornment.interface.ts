import { StringValue } from 'ms';

export interface IEnvironment {
  port: number;
  node_env: string;
  database_url: string;
  jwt_token: string;
  jwt_expires: StringValue;
}
