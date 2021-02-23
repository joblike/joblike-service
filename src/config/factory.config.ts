import * as yaml from 'js-yaml';
import { readFileSync } from 'fs';
import { join } from 'path';

export default () => {
    console.log(process.env.APP_PROFILE);
    console.log(join(__dirname, `${process.env.APP_PROFILE}.yml`));

    return yaml.load(
        readFileSync(join(__dirname, `${process.env.APP_PROFILE}.yml`), 'utf8'),
    )
  };