const Hapi = require("@hapi/hapi");
const { request } = require("http");
// TODO: Grok Hapi logging and requestId generation for AWS


/**
 * Simple mock function to provide a unit test example
 * @param {Number} [x] an integer that will be added to 2
 *
 * @return {Number} returns x incremented by 2
 */
async function sampleTestFunction({ payload }, _h) {
  console.log("A request from sampleTestFunction");

  const x = parseInt(payload.number);
  return { data: x + 2 };
}

async function helloWorld(_request, _h) {
  console.log("A request from helloWorld");

  return { hello: "world" };
}

async function init() {
  const server = new Hapi.server({
    port: process.env.port || 3000,
    routes: { cors: true },
  });

  const plugins = []; // your plugins here
  await server.register(plugins);

  server.route({
    method: "GET",
    path: "/api",
    handler: helloWorld,
  });

  server.route({
    method: "POST",
    path: "/api/math",
    handler: sampleTestFunction,
  });

  // return the server for Lambda support
  return server;
}

module.exports = {
  sampleTestFunction,
  init,
};
