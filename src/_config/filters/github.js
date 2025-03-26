import Fetch from '@11ty/eleventy-fetch';
import {fetchOptions} from '../../_data/github.js';

export const filterByRepoName = (repos, names) => {
  return repos.filter(repo => names.includes(repo.name));
};

/**
 * Takes a repo returned from the user repos returned from
 * the GitHub api and returns details from the repo.
 */
export const repoDetails = async repo => {
  let [tags, languages] = await Promise.allSettled([
    Fetch(repo.tags_url, {...fetchOptions}),
    Fetch(repo.languages_url, fetchOptions)
  ]);

  const details = mapLanguages(languages);
  const latest_release = mapLatestRelease(tags);
  const [name, description, html_url] = [repo.name, repo.description, repo.html_url];

  const result = {
    name,
    html_url,
    description,
    latest_release,
    details
  };

  return result;
};

const mapLatestRelease = tags => (tags.status === 'rejected' ? {} : tags.value.reverse().pop()?.name);

const mapLanguages = rawLanguages => {
  if (rawLanguages.status !== 'rejected') {
    const languageValue = rawLanguages.value;
    const totalBytes = Object.values(languageValue).reduce((sum, value) => sum + value, 0);
    const languages = Object.entries(languageValue)
      .sort((a, b) => {
        const [[_aKey, aValue]] = Object.entries(a);
        const [[_bKey, bValue]] = Object.entries(b);
        return bValue - aValue;
      })
      .map(([key, value]) => {
        const percent = ((value / totalBytes) * 100).toFixed(2);
        return `${key}: ${percent}%`;
      });

    return {languages};
  } else {
    return {languages: []};
  }
};
