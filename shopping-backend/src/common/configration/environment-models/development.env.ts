import { IEnvironment } from '../enviornment.interface';
import { defaultEnv } from './default-env';

export const developmentEnv = (): IEnvironment => ({
  ...defaultEnv(),
});
