import fs from 'fs';

// @ts-ignore 忽略类型检查
import lessToJS from 'less-vars-to-js';
import path from 'path';

export const themeVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, './variables.less'), 'utf8'),
);
