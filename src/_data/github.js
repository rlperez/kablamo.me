import Fetch from '@11ty/eleventy-fetch';

export default async function () {
  try {
    let url = 'https://api.github.com/users/rlperez/repos';

    // returning promise
    const repos = await Fetch(url, {
      duration: '1d',
      type: 'json',
      fetchOptions: {
        headers: {
          Authorization: `token ${process.env.GITHUB_TOKEN}`
        }
      }
    });

    return repos;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

/**
 * Takes a repo returned from the user repos returned from
 * the GitHub api and returns details from the repo.
 */
export async function getRepoDetails(repo) {
  console.log('=============================================================');
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
