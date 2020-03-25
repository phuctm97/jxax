import { chooseFile } from 'jxax/core/userInteraction';
import { read } from 'jxax/core/files';

export default function get() {
  const jsonFile = chooseFile({
    withPrompt: 'Choose your JSON configuration file',
    ofType: ['public.json'],
  });
  return JSON.parse(read(jsonFile));
}
