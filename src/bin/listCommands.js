import * as markdownTable from 'markdown-table';
import { print } from '@core/app';
import library from '@bin/library';

function addFinalDot(s) {
  if (s.endsWith('.')) return s;
  return `${s}.`;
}

function makeSectionLink(name) {
  return `[${name}](#${name.replace('.', '').toLowerCase()})`;
}

function longFormat(commands) {
  let output = '<!-- This is an auto-generated document, using `jxax --ls-cmds --format long > docs/COMMANDS.md` --> \n\n';
  output += '# Commands\n\n';
  output += 'Currently, JXAX supports following commands:\n\n';
  output += markdownTable([
    ['Command', 'Description'],
    ...commands.map((cmd) => [makeSectionLink(cmd.name), cmd.description]),
  ]);
  output += '\n\n';

  commands.forEach((cmd) => {
    output += `## ${cmd.name}\n\n`;
    output += `${addFinalDot(cmd.description)}\n\n`;
    output += markdownTable([
      ['Argument', 'Type', 'Description'],
      ...Object.entries(cmd.args)
        .map(([key, val]) => {
          let { type, description } = val;
          if (val.inclusion) {
            type = 'enum';
            description += ` (${val.inclusion.within
              .map((it) => `\`${JSON.stringify(it)}\``)
              .join(' / ')})`;
          }
          return [`\`${key}\``, `\`${type ?? 'string'}\``, description];
        }),
    ]);
    output += '\n\n';
  });
  return output;
}

function shortFormat(commands) {
  return markdownTable([
    ['Command', 'Description'],
    ...commands.map((cmd) => [`\`${cmd.name}\``, cmd.description]),
  ]);
}

/**
 * List all available `Command`(s).
 *
 * @param {string} format Output format (`short`/`long`).
 */
export default function listCommands(format = 'short') {
  const commands = Object.entries(library).map(([name, cmd]) => ({
    name,
    description: cmd.description,
    args: cmd.args,
  }));

  switch (format) {
    case 'long': print(longFormat(commands));
      break;
    case 'short': print(shortFormat(commands));
      break;
    default:
      throw new Error(`unknown format ${format}`);
  }
}
