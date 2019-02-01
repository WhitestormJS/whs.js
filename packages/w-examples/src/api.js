export function connect() {
  if (!(window.parent && window.parent.__EXAMPLES_API__)) return {
    ready() {}
  };

  const api = window.parent.__EXAMPLES_API__;
  api.connected = true;

  console.log(`${api.PREFIX}: connected.`);

  return api;
}
