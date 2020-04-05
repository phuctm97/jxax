import { readFile, chooseFile } from 'jxax/core/addtions';

export default function getConfig() {
  const jsonFile = chooseFile({
    withPrompt: 'Choose your JSON configuration file',
    ofType: ['public.json'],
  });
  return JSON.parse(readFile(jsonFile));
}
