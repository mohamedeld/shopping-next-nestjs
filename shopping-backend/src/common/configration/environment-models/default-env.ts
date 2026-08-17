import { StringValue } from 'ms';
import { IEnvironment } from '../enviornment.interface';

export const defaultEnv = (): IEnvironment => ({
  port: Number(process.env.PORT),
  node_env: process.env.NODE_ENV as string,
  database_url: process.env.DATABASE_URL as string,
  jwt_token: process.env.JWT_TOKEN as string,
  jwt_expires: process.env.JWT_EXPIRES as StringValue,
});
