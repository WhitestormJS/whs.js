export function connect() {
  if (!(window.parent && window.parent.__ExamplesAPI)) return;

  const api = window.parent.__ExamplesAPI;
  api.connected = true;

  console.log(`${api.PREFIX}: connected.`);

  return api;
}
