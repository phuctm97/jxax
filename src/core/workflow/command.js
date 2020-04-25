/**
 * @typedef {object} Command
 *
 * `Command` is the most important concept in JXAX.
 * `Command` is an extensible automation unit in JXAX.
 * A `Command` is essentially a function which requires a set of arguments and performs certain
 * automation.
 *
 * @property {string} description A quick summary about the command.
 * @property {object} args The command arguments schema.
 * @property {(object) => any} run The command's automation logic.
 */
