// Basic example from docs:
const api = require('./api');
console.log("api", api)


process.on('unhandledRejection', (err) => {

  console.log(err);
  process.exit(1);
});

const init = async () => {
  const server = await api.init();
  await server.start();
  console.log('Server running on %s', server.info.uri);
}

init();