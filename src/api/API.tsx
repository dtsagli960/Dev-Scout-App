const searchGithub = async () => {
  try {
    const start = Math.floor(Math.random() * 1000000) + 1;
    console.log(import.meta.env);
    const response = await fetch(
      `https://api.github.com/users?since=${start}`,
      {
        headers: {
          Authorization: `Bearer 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`,
        },
      }
    );
    console.log('Response:', response);
    const data = await response.json();
    if (!response.ok) {
      throw new Error('invalid API response, check the network tab');
    }
    console.log('Data:', data);
    return data;
  } catch (err) {
    console.log('an error occurred', err);
    return [];
  }
};

const searchGithubUser = async (username: string) => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `Bearer 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`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error('invalid API response, check the network tab');
    }
    return data;
  } catch (err) {
    console.log('an error occurred', err);
    return {};
  }
};

export { searchGithub, searchGithubUser };
