import Fetch from '@11ty/eleventy-fetch';

export const fetchOptions = {
  duration: '1d',
  type: 'json',
  fetchOptions: {
    headers: {
      Authorization: `token ${process.env.GITHUB_TOKEN}`
    }
  }
};

export default async function () {
  try {
    let url = 'https://api.github.com/users/rlperez/repos';

    // returning promise
    const repos = await Fetch(url, fetchOptions);

    return repos;
  } catch (e) {
    console.error(e);
    throw e;
  }
}
