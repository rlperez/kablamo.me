import Fetch from '@11ty/eleventy-fetch';

export default async function () {
  let url = 'https://api.github.com/users/rlperez/repos';

  // returning promise
  let data = await Fetch(url, {
    duration: '1d',
    type: 'json'
  });

  console.error({data});

  return data;
}

/**
 * Takes a repo returned from the user repos returned from
 * the GitHub api and returns details from the repo.
 */
export async function getRepoDetails(repo) {
  const [latest_release, languages] = await Promise.allSettled([
    Promise.resolve(repo.name),
    Fetch(repo.releases_url, {id: 'latest'}),
    Fetch(repo.languages_url)
  ]);

  console.error(latest_release);

  return {
    name: repo.name,
    html_url: repo.html_url,
    description: repo.description,
    latest_release,
    languages
  };
}
