import { chooseFile } from 'jxax/core/addtions/userInterations';
import readFile from 'jxax/core/addtions/readFile';

export default function getConfig() {
  const jsonFile = chooseFile({
    withPrompt: 'Choose your JSON configuration file',
    ofType: ['public.json'],
  });
  return JSON.parse(readFile(jsonFile));
}
