import Fetch from '@11ty/eleventy-fetch';

export default async function () {
  let url = 'https://api.github.com/users/rlperez/repos';

  // returning promise
  let data = await Fetch(url, {
    duration: '1d',
    type: 'json'
  });

  return data;
}
