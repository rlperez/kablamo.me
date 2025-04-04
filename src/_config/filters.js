import {toISOString, formatDate} from './filters/dates.js';
import {markdownFormat} from './filters/markdown-format.js';
import {shuffleArray} from './filters/sort-random.js';
import {sortAlphabetically} from './filters/sort-alphabetic.js';
import {splitlines} from './filters/splitlines.js';
import {striptags} from './filters/striptags.js';
import {toAbsoluteUrl} from './filters/to-absolute-url.js';
import {slugifyString} from './filters/slugify.js';
import {stringify, parse} from './filters/json.js';
import {filterByRepoName, repoDetails} from './filters/github.js';

export default {
  toISOString,
  formatDate,
  markdownFormat,
  splitlines,
  striptags,
  toAbsoluteUrl,
  shuffleArray,
  sortAlphabetically,
  slugifyString,
  stringify,
  parse,
  filterByRepoName,
  repoDetails
};
