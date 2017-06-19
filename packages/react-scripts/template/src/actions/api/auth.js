export function exchangeToken({ providerUrl }) {
  // eslint-disable-line import/prefer-default-export
  const endpoint = `${providerUrl}/refresh`;
  return fetch(endpoint);
}
